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

    // Client-side validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          budgetLimit: budgetLimit || 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("User Registered Successfully!");
      console.log("Registration Success:", response.data);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration Error Details:", {
        message: error.message,
        response: error.response?.data,
        stack: error.stack,
      });
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
