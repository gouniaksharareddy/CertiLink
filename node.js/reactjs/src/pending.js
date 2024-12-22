import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./pendingtasks.css";
import axios from "axios";
import emailjs from "emailjs-com";

const Pending = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  // Fetch tasks with "pending" status
  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/applications/pending");
        setPendingTasks(response.data);
      } catch (error) {
        console.error("Error fetching pending tasks:", error);
      }
    };

    fetchPendingTasks();
  }, []);

  // Handle "Mark as Complete" button
  const handleComplete = async (id, rollnumber) => {
    try {
      console.log("Updating task with ID:", id);
  
      // Update task status to "completed"
      const response = await axios.put(
        `http://localhost:3000/applications/requests/${id}/status`,
        { status: "completed" }
      );
  
      if (response.status === 200) {
        console.log("Task marked as complete!");
  
        // Fetch the user details (name and email) from the backend
        const { user, certificateType } = response.data;
        const { name, email } = user;
  
        // Send email notification using EmailJS
        emailjs
          .send(
            "service_sfl7z1n", // Replace with your EmailJS Service ID
            "template_au1anzr", // Replace with your EmailJS Template ID
            {
              user_name: name,
              certificate_type: certificateType, // Make sure this is returned correctly from the backend
              user_email: email,
            },
            "nrZnmJFz0TgZbL35d" // Replace with your EmailJS Public Key
          )
          .then(
            (result) => {
              console.log("Email sent successfully:", result.text);
              /*alert("Email notification sent to the user!");*/
            },
            (error) => {
              console.error("Error sending email:", error);
              alert("Task marked as complete, but email notification failed.");
            }
          );
  
        // Remove the completed task from the list
        setPendingTasks(pendingTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };
  

  return (
    <div>
      <Sidebar />
      <div className="pending-content">
        <h3>Pending Tasks</h3>
        <p>Manage tasks that are currently in progress:</p>

        {/* List of pending tasks */}
        <div className="task-list">
          {pendingTasks.length > 0 ? (
            pendingTasks.map((task, index) => (
              <div className="task-item card mb-3" key={index}>
                <div className="card-body">
                  <h5 className="card-title">Task #{index + 1}</h5>
                  <p className="card-text">User ID: {task.rollnumber}</p>
                  <p className="card-text">Certificate Type: {task.certificateType}</p>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleComplete(task._id, task.rollnumber)}
                  >
                    Mark as Complete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No pending tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pending;