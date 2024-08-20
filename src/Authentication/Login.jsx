import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Signup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("token", response.data.token);
      alert(response.data.message || "Login Successfull");
      console.log("Login Successfull", response.data);
      navigate("/budgetPage");
    } catch (error) {
      alert(error.response?.data?.message || "Login Unsuccessful");
      console.error("Login Error", error);
    }
  };

  return (
    <>
      <div className="mainSignUpContainer">
        <div className="SignUpContainer">
          <div className="signUpContainer1">
            <img src="signUpImage.png" className="signUpImage" />
            <div className="signUpContainer2">
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="signUpForm">
                  <label>
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </label>
                  <label>
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </label>

                  <input type="submit" className="SignUpButton" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
