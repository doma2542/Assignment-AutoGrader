import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Added import

const departments = [
  "Computer Science and Engineering",
  "Mathematics and Computing",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electronics and Communication Engineering",
  "Chemical Engineering",
  "Mathematics",
  "Physics"
];

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");

  const navigate = useNavigate(); // Added navigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = { name, password, rollNo, department, email, role };
    console.log("Signup data:", signupData);
    // TODO: send signupData to backend API
  };

  const handleBack = () => {
    navigate("/login");  // Navigate to login page on back button click
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2>Signup</h2>

        <div>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <label>Roll Number:</label><br />
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Department:</label><br />
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              >
                <option value="" disabled>Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        {/* Buttons container */}
        <div className="form-footer">
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
