import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";
import "./Signup.css";
import { toast, Toaster } from "react-hot-toast";

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

      console.log("Login Successfull", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);

      toast.success(response.data.message || "Login Successful!");
      setTimeout(() => {
        navigate("/budgetPage");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Unsuccessful");
      console.error("Login Error", error);
    }
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="mainSignUpContainer">
        <div className="SignUpContainer">
          <div className="signUpContainer1">
            <img src="signUpImage.png" className="signUpImage" />
            <div className="signUpContainer2">
              <h1>Sign in</h1>
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
