import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SubmitAssignmentPage() {
  const { assignmentId } = useParams();
  const [file, setFile] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch existing submission (and feedback)
    axios.get(`/api/assignments/${assignmentId}/submission`)
      .then(res => {
        if(res.data.feedback){
          setFeedback(res.data.feedback);
        }
      })
      .catch(err => {
        // No submission yet or error
        setFeedback('');
      });
  }, [assignmentId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`/api/assignments/${assignmentId}/submit`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Failed to submit assignment');
    }
  }

  return (
    <div>
      <h2>Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}

      <h3>Instructor Feedback</h3>
      <div style={{ border: '1px solid #ccc', padding: '10px', minHeight: '50px' }}>
        {feedback || 'No feedback yet.'}
      </div>
    </div>
  );
}
