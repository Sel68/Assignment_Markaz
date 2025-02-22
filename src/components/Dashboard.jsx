import React from "react";

const Dashboard = ({ onRequestExtension }) => {
  return (
    <div className="space-y-6">
      {/* Upcoming Deadlines */}
      <div className="bg-black border border-blue-700 rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Upcoming Deadlines</h2>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Linear Algebra Assignment</span>
            <span className="text-primary">Due: 2025-03-01</span>
          </li>
          <li className="flex justify-between">
            <span>Data Structures Quiz</span>
            <span className="text-primary">Due: 2025-03-03</span>
          </li>
          <li className="flex justify-between">
            <span>Operating Systems Project</span>
            <span className="text-primary">Due: 2025-03-05</span>
          </li>
        </ul>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-black border border-blue-700 rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2">
          <li>Submitted assignment for <strong>Calculus</strong></li>
          <li>Uploaded draft for <strong>Physics Lab</strong></li>
          <li>Collaborated on <strong>Group Project</strong></li>
        </ul>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-black border border-blue-700 rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
            Add Course
          </button>
          <button className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
            New Assignment
          </button>
          <button onClick={onRequestExtension} className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
            Request Extension
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
