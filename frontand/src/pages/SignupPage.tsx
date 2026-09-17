import { useEffect, useState } from "react";
import { api } from "../api";

const SignupPage = () => {
  const [isToken, setIsToken] = useState();
  useEffect(() => {
    const fetch = async () => {
      const token = await api.get("/me");
      setIsToken(isToken);
    };
    fetch();
  });
  return <div>SignupPage</div>;
};

export default SignupPage;
