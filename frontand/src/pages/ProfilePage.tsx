import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Deatails {
  name: string;
  email: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState<boolean | any>(true);
  const [details, setDetails] = useState();
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
        console.log(data);
        if (!data.user) {
          setIsToken(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMe();
  }, []);
  const handleClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/profile", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (data.name) {
        setDetails(data);
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = async () => {
    await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsToken(false);
  };
  if (!isToken) {
    navigate("/login");
  }
  return (
    <div>
      <button onClick={handleClick}>להצגת פרטי משתמש לחץ</button>
      {details && (
        <>
          <p>{(details as Deatails).name}</p>
          <p>{(details as Deatails).email}</p>
        </>
      )}
      <button onClick={handleLogout}>התנתק</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
