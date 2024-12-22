import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar component
import "./completed.css"; // Import specific CSS for this page
import axios from "axios";

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  // Fetch tasks with "completed" status
  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/applications/requests?status=completed");
        setCompletedTasks(response.data);
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    fetchCompletedTasks();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="completed-content">
        <h3>Completed Tasks</h3>
        <p>Here are the tasks that have been successfully completed:</p>

        {/* Table for displaying completed tasks */}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>Certificate Type</th>
              <th>Completion Date</th>
            </tr>
          </thead>
          <tbody>
            {completedTasks.length > 0 ? (
              completedTasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task.rollnumber}</td>
                  <td>{task.certificateType}</td>
                  <td>{new Date(task.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No completed tasks available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Completed;
