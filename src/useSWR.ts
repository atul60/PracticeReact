import { useEffect, useState } from "react";

export function useSWR<T = any, E = any>(
  _key: string,
  fetcher: () => T | Promise<T>
): {
  data?: T;
  error?: E;
} {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    Promise.resolve(fetcher())
      .then((res) => setData(res))
      .catch((err) => setError(err));
  }, []);

  return { data, error };
}

// if you want to try your code on the right panel
// remember to export App() component like below

// export function App() {
//   return <div>your app</div>
// }
