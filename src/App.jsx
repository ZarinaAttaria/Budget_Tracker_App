import "./App.css";
import Login from "./Authentication/Login";
import SignUp from "./Authentication/SignUp";
import { Route, Routes } from "react-router";
import BudgetPage from "./ManageBudget/BudgetPage";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/budgetPage" element={<BudgetPage />} />
      </Routes>
    </>
  );
}

export default App;
