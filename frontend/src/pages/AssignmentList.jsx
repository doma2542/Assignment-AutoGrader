import React, { useEffect, useState } from "react";
import axios from "axios"; // assuming axios for HTTP requests
import "../styles/AssignmentList.css";

const AssignmentList = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Fetch assignments for the user's department
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`/api/assignments?department=${user.department}`);
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [user]);

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div className="assignment-container">
      <aside className="user-info">
        <h3>User Details</h3>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Roll No:</strong> {user.rollNo}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </aside>

      <main className="assignment-list">
        <h2>Assignments for {user.department}</h2>
        {assignments.length === 0 ? (
          <p>No assignments found.</p>
        ) : (
          assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-card">
              <h3>{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default AssignmentList;
