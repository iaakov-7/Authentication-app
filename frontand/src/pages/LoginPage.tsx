import { useEffect, useState, type FormEvent } from "react";
import { data, useNavigate } from "react-router";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isToken, setIsToken] = useState<boolean | any>();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMe = async () => {
      console.log("fetch me");
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data, "from login");
        if (data.user) {
          setIsToken(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMe();
  }, []);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      username,
      password,
    };
    console.log(body);
    const response = await fetch("http://localhost:3000/api/login", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (data.message === "התחברת בהצלחה") {
      setMessage(data.message);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } else {
      setMessage(data.message);
    }
  };

  if (isToken) {
    navigate("/profile");
  }
  return (
    <div>
      <h1>התחברות</h1>{" "}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={username}
          placeholder="הכנס שם משתמש"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          min={8}
          value={password}
          placeholder="הכנס סיסמא"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">התחבר</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
