import { useEffect, useState, type FormEvent } from "react";

import { useNavigate } from "react-router";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState<boolean | any>();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
      email,
    };
    console.log(body);
    const response = await fetch("http://localhost:3000/api/signup", {
      body: JSON.stringify(body),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    if (data.message.includes("Saved")) {
      setMessage(`שלום נרשמת בהצלחה`);
      setPassword("");
      setUsername("");
      setEmail("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setMessage(data.message);
    }
  };
  if (isToken) {
    navigate("/profile");
  }

  return (
    <div>
      <h1>הרשמה</h1>
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
        <input
          type="email"
          value={email}
          placeholder="הכנס מייל"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">שמור פרטים</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignupPage;
