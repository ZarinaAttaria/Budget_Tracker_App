import { useState } from "react";
import "../App.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/login`,
        {
          email,
          password,
        }
      );
      alert(response.data.message || "Login Successfull");
      console.log("Login Successfull", response.data);
    } catch (error) {
      alert(error.response?.data?.message || "Login Unsuccessful");
      console.error("Login Error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>

        <input type="submit" />
      </form>
    </>
  );
}

export default Login;
