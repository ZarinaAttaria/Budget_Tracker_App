import { useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router";

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

      alert(response.data.message || "User Registered Successfully");
      console.log("User Registered Successfully", response.data);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration Unsuccessful");
      console.error("Registration Error", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder=" Last Name"
          />
        </label>
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
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </label>
        <label>
          <input
            type="number"
            value={budgetLimit}
            onChange={(e) => setBudgetLimit(e.target.value)}
            placeholder=" Budget Limit"
          />
        </label>
        <input type="submit" />
      </form>
    </>
  );
}

export default SignUp;
