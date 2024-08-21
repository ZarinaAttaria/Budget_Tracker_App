import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Signup.css";
import toast, { Toaster } from "react-hot-toast";
function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [budgetLimit, setBudgetLimit] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          budgetLimit,
        }
      );
      toast.success("User Registered Successfully!");

      console.log("User Registered Successfully", response.data);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Unsuccessful");
      console.error("Registration Error", error);
    }
  };

  return (
    <>
      {localStorage.removeItem("email")}
      {localStorage.removeItem("token")}
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <div className="mainSignUpContainer">
        <div className="SignUpContainer">
          <div className="signUpContainer1">
            <img src="signUpImage.png" className="signUpImage" />
            <div className="signUpContainer2">
              <h1>Sign Up</h1>
              <Link to="/login" className="loginLink">
                Already have an account?
              </Link>

              <form onSubmit={handleSubmit}>
                <div className="signUpForm">
                  <label>
                    <input
                      className="input"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder=" Last Name"
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm Password"
                    />
                  </label>
                  <label>
                    <input
                      className="input"
                      type="number"
                      value={budgetLimit}
                      onChange={(e) => setBudgetLimit(e.target.value)}
                      placeholder=" Budget Limit"
                    />
                  </label>
                  <input type="Submit" className="SignUpButton" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
