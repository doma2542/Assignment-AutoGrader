import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AssignmentList from "./pages/AssignmentList";        // Student dashboard
// import TutorAssignments from "./pages/TutorAssignments";    // Tutor dashboard
import SubmitAssignmentPage from "./pages/SubmitAssignmentPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public pages */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboards */}
        <Route path="/assignments" element={<AssignmentList />} />
        {/* <Route path="/tutor-assignments" element={<TutorAssignments />} /> */}
        <Route path="/assignments/:assignmentId/submit" element={<SubmitAssignmentPage />} />


        {/* Catch-all unmatched routes redirect to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
