import { api } from "../api";

export const useAuto = () => {
  const checkToken = async () => {
    const token = await api.get("/me");
    if (!token) {
      return false;
    }
    return true;
  };
  return { checkToken };
};
