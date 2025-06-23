import React, { useEffect, useState } from "react";
import axios from "axios";

const TutorAssignmentList = ({ user }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "tutor") return;

    const fetchTutorAssignments = async () => {
      try {
        const res = await axios.get(`/api/assignments?tutorEmail=${user.email}`);
        setAssignments(res.data);
      } catch (err) {
        console.error("Error fetching tutor assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorAssignments();
  }, [user]);

  if (loading) return <p>Loading assignments...</p>;

  return (
    <div>
      <h2>My Created Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments created yet.</p>
      ) : (
        assignments.map((assignment) => (
          <div key={assignment._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TutorAssignmentList;
