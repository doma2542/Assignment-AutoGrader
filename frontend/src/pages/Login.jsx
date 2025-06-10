import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // import useNavigate
import "../styles/AuthForm.css";

const Login = () => {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate();  // initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginData = { rollNo, password, role };
    console.log("Login data:", loginData);

    // Simulate backend login API call (replace this with real API call)
    // Here, you might use fetch/axios to send loginData and get response
    // For example:
    // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(loginData) });
    // const result = await response.json();

    // For demo, just fake a successful login:
    const result = { success: true, data: { role } };

    if (result.success) {
      // Redirect based on role
      if (result.data.role === "student") {
        navigate("/assignments");   // student dashboard route
      } else if (result.data.role === "tutor") {
        navigate("/tutor-assignments"); // tutor dashboard route
      }
    } else {
      // handle login failure (show error message)
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>LOGIN</h2>
        <div>
          <label>Roll Number:</label><br />
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label><br />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        <div className="form-footer">
          <button type="submit">Submit</button>
          <Link to="/signup" className="register-button">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
