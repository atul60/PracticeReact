const Table = ({ data, columns }: any) => {
  return (
    <table>
      <tr>
        {columns.map((item: any, index: number) => (
          <th id={item.id} key={index}> {item.value} </th>
        ))}
      </tr>
        {
          data.map((item) => {
            return (
              <tr>
                {
                  columns.map((col) => <td>{`${item[col.id] ?? "-"}`}</td>)
                }
              </tr>
            )
          } )
        }
    </table>
  );
};

export default Table;
