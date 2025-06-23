import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AssignmentList from "./pages/AssignmentList";        // Student dashboard
import SubmitAssignmentPage from "./pages/SubmitAssignmentPage";
import TutorAssignmentList from "./pages/TutorAssignmentList";
import CreateAssignmentPage from "./pages/CreateAssignmentPage";

import "./App.css"; // if you have styling here

const App = () => {
  // Retrieve user info from localStorage (assumes login stores it)
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Router>
      {/* Conditional Tutor Nav */}
      {user?.role === "tutor" && (
        <nav className="tutor-nav">
          <Link to="/tutor/assignments" className="nav-link">📘 My Assignments</Link>
          <Link to="/tutor/create-assignment" className="nav-link">➕ Create Assignment</Link>
        </nav>
      )}

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Student & Submission pages */}
        <Route path="/assignments" element={<AssignmentList user={user} />} />
        <Route path="/assignments/:assignmentId/submit" element={<SubmitAssignmentPage />} />

        {/* Tutor pages */}
        <Route path="/tutor/assignments" element={<TutorAssignmentList user={user} />} />
        <Route path="/tutor/create-assignment" element={<CreateAssignmentPage user={user} />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
