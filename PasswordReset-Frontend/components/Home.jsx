// Home Component
import { useEffect, useState } from "react";
import { backendUrl } from "../config";
import { Link } from "react-router-dom";

export const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserData(user);
    }
  }, []);

  return (
    <div>
      <h3>Welcome</h3>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
        </div>
      )}
    </div>
  );
};
