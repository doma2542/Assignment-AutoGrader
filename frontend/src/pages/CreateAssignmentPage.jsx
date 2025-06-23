import React, { useState } from "react";
import axios from "axios";

const CreateAssignmentPage = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newAssignment = {
        title,
        description,
        dueDate,
        tutorEmail: user.email,
        department: user.department
      };
      const res = await axios.post("/api/assignments/create", newAssignment);
      setMessage("Assignment created successfully!");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      console.error("Error creating assignment:", err);
      setMessage("Failed to create assignment.");
    }
  };

  if (!user || user.role !== "tutor") {
    return <p>Unauthorized. Please log in as a tutor.</p>;
  }

  return (
    <div>
      <h2>Create New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Due Date:</label><br />
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAssignmentPage;
