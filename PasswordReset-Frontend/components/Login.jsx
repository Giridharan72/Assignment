// Login Component
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { backendUrl } from "../config";

export const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (ele) => {
    ele.preventDefault();
    const loginResponse = await fetch(`${backendUrl}/login`, {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (loginResponse.status === 401) {
      alert("Login failed");
    } else if (loginResponse.status === 403) {
      alert("Not registered");
    } else {
      const userData = {
        username: login.email, // Assuming email as username
        password: login.password
      };
      localStorage.setItem("user", JSON.stringify(userData));
      alert("Login success");
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login
    }
    setLogin({
      email: "",
      password: ""
    });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div style={{
      height: '320px',
      width: '290px',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      borderRadius: '10px'
    }}>
      <h4>Login Form</h4>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="email">Email : </label>
        <input type="text" name="email" id="email" required value={login.email} onChange={handleChange} />
        <br />
        <br />
        <label htmlFor="password">Password : </label>
        <input type="password" name="password" id="password" required value={login.password} onChange={handleChange} />
        <br />
        <br />
        <Link to='/forgotPassword'>Forgot Password ?</Link>
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      <Link to={'/register'}>not yet registered ? Register</Link>
    </div>
  );
};
