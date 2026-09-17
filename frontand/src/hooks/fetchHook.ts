import { useState } from "react";
import { api } from "../api";

export const useFetch = <T>() => {
  const [data, setData] = useState<T | null>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoadin] = useState(false);
  const executeReq = async (
    method: "post" | "get" | "patch" | "delete" | "put",
    endpoint: string,
    body?: object,
  ) => {
    setIsLoadin(true);
    setError("");
    try {
      let res;
      if (["post", "patch", "put"].includes(method)) {
        res = await api[method](endpoint, body);
      } else {
        res = await api[method](endpoint);
      }
      setData(res.data);
      return res.data;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoadin(false);
    }
  };
  return { executeReq, data, error, isLoading };
};
