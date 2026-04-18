/*
HierarchicalFilter.tsx
Enterprise-grade, generic hierarchical filter control (React + TypeScript + Tailwind)

What this file contains:
- A generic TreeNode type and props-driven HierarchicalFilter component
- Efficient parent/child maps construction, indeterminate state logic, and bulk selection
- Accessible checkbox handling (aria), keyboard-friendly expand/collapse, and simple search
- Well-documented API and a usage example at the bottom
- Component/Class diagram (Mermaid) showing the structure and responsibilities

Component/Class diagram (Mermaid):

```mermaid
classDiagram
    direction LR
    HierarchicalFilter "1" o-- "1..*" NodeItem : renders
    HierarchicalFilter : -nodes: TreeNode[]
    HierarchicalFilter : -expanded: Map<string,bool>
    HierarchicalFilter : -selected: Set<string>
    HierarchicalFilter : -parentMap: Map<string,string | null>
    HierarchicalFilter : +onApply(selected: string[]): void
    NodeItem : +props.node: TreeNode
    NodeItem : +props.level: number
    NodeItem : +props.expanded: boolean
    NodeItem : +toggle(): void
    SelectionManager <|-- HierarchicalFilter : uses
    SearchBox <|-- HierarchicalFilter : uses

%% Notes:
%% - HierarchicalFilter is the container & state manager (selection/expand/search)
%% - NodeItem is a pure recursive renderer of a single tree node
%% - SelectionManager logic is implemented via helpers in this file (not a separate class)
*/

import React, { useCallback, useEffect, useMemo, useState } from "react";

// ------------------------- Types -------------------------
export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
  meta?: any; // generic field for consumers
};

export type HierarchicalFilterProps = {
  nodes: TreeNode[]; // root nodes
  defaultSelectedIds?: string[]; // initial selection
  onApply?: (selectedIds: string[]) => void;
  onCancel?: () => void;
  className?: string;
  searchPlaceholder?: string;
  maxDepthToAutoExpand?: number; // convenience
};

// ------------------------- Helpers -------------------------
// Build helper maps: id -> node, id -> parentId, id -> childrenIds
function buildMaps(nodes: TreeNode[]) {
  const nodeMap = new Map<string, TreeNode>();
  const parentMap = new Map<string, string | null>();
  const childrenMap = new Map<string, string[]>();

  function walk(node: TreeNode, parent: string | null) {
    nodeMap.set(node.id, node);
    parentMap.set(node.id, parent);
    const childIds: string[] = [];
    if (node.children) {
      for (const c of node.children) {
        childIds.push(c.id);
        walk(c, node.id);
      }
    }
    childrenMap.set(node.id, childIds);
  }

  for (const r of nodes) walk(r, null);
  return { nodeMap, parentMap, childrenMap };
}

// collect all descendant ids for a given id
function collectDescendants(id: string, childrenMap: Map<string, string[]>) {
  const out: string[] = [];
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop()!;
    out.push(cur);
    const ch = childrenMap.get(cur) || [];
    for (const c of ch) stack.push(c);
  }
  return out;
}

// compute checked & indeterminate for a node
function computeNodeState(
  id: string,
  selected: Set<string>,
  childrenMap: Map<string, string[]>
): { checked: boolean; indeterminate: boolean } {
  const childIds = childrenMap.get(id) || [];
  if (childIds.length === 0) {
    return { checked: selected.has(id), indeterminate: false };
  }
  // for internal nodes, examine children recursively
  let allChecked = true;
  let anyChecked = false;
  for (const c of childIds) {
    const { checked, indeterminate } = computeNodeState(
      c,
      selected,
      childrenMap
    );
    if (checked || indeterminate) anyChecked = true;
    if (!checked || indeterminate) allChecked = false;
    // if indeterminate children exist, propagate
  }
  return { checked: allChecked, indeterminate: anyChecked && !allChecked };
}

// A faster alternative: compute using counts. We'll compute counts of selected descendants.
function computeCounts(
  id: string,
  childrenMap: Map<string, string[]>,
  selected: Set<string>
) {
  const childIds = childrenMap.get(id) || [];
  if (childIds.length === 0)
    return { total: 1, checked: selected.has(id) ? 1 : 0 };
  let total = 1;
  let checked = selected.has(id) ? 1 : 0;
  for (const c of childIds) {
    const rec = computeCounts(c, childrenMap, selected);
    total += rec.total;
    checked += rec.checked;
  }
  return { total, checked };
}

function getStateFromCounts(
  id: string,
  childrenMap: Map<string, string[]>,
  selected: Set<string>
) {
  const { total, checked } = computeCounts(id, childrenMap, selected);
  if (total === checked) return { checked: true, indeterminate: false };
  if (checked === 0) return { checked: false, indeterminate: false };
  return { checked: false, indeterminate: true };
}

// ------------------------- Subcomponents -------------------------

type NodeItemProps = {
  node: TreeNode;
  level: number;
  expanded: boolean;
  toggleExpand: (id: string) => void;
  onToggleSelect: (id: string) => void;
  isChecked: boolean;
  isIndeterminate: boolean;
  renderChildren?: (children: React.ReactNode) => React.ReactNode;
};

const NodeItem: React.FC<NodeItemProps> = ({
  node,
  level,
  expanded,
  toggleExpand,
  onToggleSelect,
  isChecked,
  isIndeterminate,
  renderChildren,
}) => {
  const hasChildren = (node.children && node.children.length > 0) || false;

  return (
    <div className={`flex flex-col`}>
      <div
        className={`flex items-center gap-2 py-1 pl-${Math.min(
          6,
          level * 2
        )} pr-2`}
      >
        {hasChildren ? (
          <button
            aria-label={expanded ? "Collapse" : "Expand"}
            onClick={() => toggleExpand(node.id)}
            className="w-6 h-6 shrink-0 flex items-center justify-center rounded focus:outline-none"
            tabIndex={0}
          >
            <svg
              className={`w-4 h-4 transform ${expanded ? "rotate-90" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 4l8 6-8 6V4z" />
            </svg>
          </button>
        ) : (
          <div style={{ width: 24 }} />
        )}

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isChecked}
            ref={(el) => {
              if (el) el.indeterminate = isIndeterminate;
            }}
            onChange={() => onToggleSelect(node.id)}
            aria-checked={isIndeterminate ? "mixed" : isChecked}
            className="w-4 h-4"
          />
          <span className="text-sm">{node.label}</span>
        </label>
      </div>

      {hasChildren && expanded && (
        <div className="ml-6 border-l border-gray-100 pl-2">
          {renderChildren &&
            renderChildren(
              node.children!.map((c) => (
                <React.Fragment key={c.id}>
                  {/* children are rendered by parent */}
                </React.Fragment>
              ))
            )}
        </div>
      )}
    </div>
  );
};

// ------------------------- Main Component -------------------------

export const HierarchicalFilter: React.FC<HierarchicalFilterProps> = ({
  nodes,
  defaultSelectedIds = [],
  onApply,
  onCancel,
  className = "",
  searchPlaceholder = "Search...",
}) => {
  const { nodeMap, parentMap, childrenMap } = useMemo(
    () => buildMaps(nodes),
    [nodes]
  );

  const [selected, setSelected] = useState<Set<string>>(
    new Set(defaultSelectedIds)
  );
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    // initial: expand roots
    const rec: Record<string, boolean> = {};
    for (const n of nodes) rec[n.id] = true;
    return rec;
  });
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSelected(new Set(defaultSelectedIds));
  }, [defaultSelectedIds]);

  // Toggle expand
  const toggleExpand = useCallback((id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  // toggle select: when selecting a node, select/deselect entire subtree
  const onToggleSelect = useCallback(
    (id: string) => {
      setSelected((prev) => {
        const next = new Set(prev);
        const descendants = collectDescendants(id, childrenMap);
        // if root of subtree fully selected -> unselect all
        const allSelected = descendants.every((d) => next.has(d));
        if (allSelected) {
          for (const d of descendants) next.delete(d);
        } else {
          for (const d of descendants) next.add(d);
        }
        // After changing subtree, update ancestors: but our checked calculation uses selected set directly
        return next;
      });
    },
    [childrenMap]
  );

  const handleApply = useCallback(() => {
    if (onApply) onApply(Array.from(selected));
  }, [onApply, selected]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
  }, [onCancel]);

  // Search filter: produce a filtered tree keeping matching nodes and their ancestors
  function filterTree(nodes: TreeNode[], q: string): TreeNode[] {
    if (!q) return nodes;
    const lower = q.toLowerCase();

    function nodeMatches(node: TreeNode): boolean {
      if (node.label.toLowerCase().includes(lower)) return true;
      if (node.children) return node.children.some(nodeMatches);
      return false;
    }

    function cloneFiltered(node: TreeNode): TreeNode | null {
      if (!nodeMatches(node)) return null;
      const cloned: TreeNode = { ...node };
      if (node.children) {
        cloned.children = node.children
          .map(cloneFiltered)
          .filter((x): x is TreeNode => x !== null);
      }
      return cloned;
    }

    return nodes.map(cloneFiltered).filter((x): x is TreeNode => x !== null);
  }

  const filtered = useMemo(() => filterTree(nodes, query), [nodes, query]);

  // Render recursion using NodeItem; compute state via counts to avoid deep recursion per render too often
  const renderNodes = useCallback(
    (list: TreeNode[], level = 0) => {
      return list.map((n) => {
        const state = getStateFromCounts(n.id, childrenMap, selected);
        const nodeExpanded = !!expanded[n.id];
        return (
          <div key={n.id}>
            <NodeItem
              node={n}
              level={level}
              expanded={nodeExpanded}
              toggleExpand={toggleExpand}
              onToggleSelect={onToggleSelect}
              isChecked={state.checked}
              isIndeterminate={state.indeterminate}
              renderChildren={(children) =>
                renderNodes(n.children || [], level + 1)
              }
            />
          </div>
        );
      });
    },
    [childrenMap, selected, expanded, toggleExpand, onToggleSelect]
  );

  return (
    <div className={`w-80 bg-white rounded-lg shadow-md p-4 ${className}`}>
      <div className="mb-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full border rounded px-3 py-2 text-sm"
          aria-label="Search filters"
        />
      </div>

      <div className="max-h-96 overflow-auto pr-2">
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500">No items</div>
        )}
        {renderNodes(filtered)}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleApply}
          className="flex-1 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
        >
          Apply Filter
        </button>
        <button
          onClick={handleCancel}
          className="flex-1 py-2 rounded-md border border-gray-200 text-sm font-medium hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// ------------------------- Usage Example -------------------------

export default function ExampleUsage() {
  const sample: TreeNode[] = [
    {
      id: "banking",
      label: "Banking Circulars",
      children: [
        { id: "banking-notifs", label: "Notifications" },
        {
          id: "banking-master",
          label: "Master Circulars",
          children: [
            { id: "subcat-01", label: "Sub Category 01" },
            {
              id: "subcat-02",
              label: "Sub Category 02",
              children: [
                { id: "subcat-02-a", label: "Sub Category 02 A" },
                { id: "subcat-02-b", label: "Sub Category 02 B" },
              ],
            },
          ],
        },
      ],
    },
    { id: "it", label: "IT Support" },
    { id: "news", label: "News" },
  ];

  const handleApply = (selected: string[]) => {
    // enterprise-level: we'd send these ids to API or update the store
    console.log("Applied selection:", selected);
  };

  return (
    <div className="p-6">
      <h3 className="mb-3 font-semibold">Hierarchical Filter Demo</h3>
      <HierarchicalFilter
        nodes={sample}
        defaultSelectedIds={["subcat-02-a"]}
        onApply={handleApply}
      />
    </div>
  );
}
