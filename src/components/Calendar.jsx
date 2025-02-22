import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Calendar = ({ courses }) => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [platform, setPlatform] = useState("Email to teacher");

  const platformOptions = ["Email to teacher", "Link with my MS Teams", "Submit in Class"];

  // Auto-detect platform based on matching course info when subject changes
  useEffect(() => {
    if (subject.trim() !== "") {
      const matchedCourse = courses.find(
        (course) => course.courseName.toLowerCase() === subject.trim().toLowerCase()
      );
      if (matchedCourse) {
        setPlatform(matchedCourse.platform);
      } else {
        setPlatform("Email to teacher");
      }
    }
  }, [subject, courses]);

  const addAssignment = () => {
    const newAssignment = { subject, platform, dueDate };
    setAssignments([...assignments, newAssignment]);
    setSubject("");
    setDueDate("");
    setPlatform("Email to teacher");
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar - Due Assignments</h2>
      <button
        className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition mb-4"
        onClick={() => setShowForm(true)}
      >
        Add New Assignment
      </button>
      {showForm && (
        <div className="mb-4 border border-blue-700 p-4 rounded">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          />
          <input
            type="text"
            placeholder="Due Date (DD/MM/YY)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          >
            {platformOptions.map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded transition"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition"
              onClick={addAssignment}
            >
              Save Assignment
            </button>
          </div>
        </div>
      )}
      <div>
        {assignments.length === 0 ? (
          <p>No assignments due.</p>
        ) : (
          <ul className="space-y-2">
            {assignments.map((assignment, index) => (
              <li key={index} className="border border-blue-700 rounded p-2 flex justify-between items-center">
                <div>
                  <div className="font-bold">{assignment.subject}</div>
                  <div>Platform: {assignment.platform}</div>
                  <div>Due Date: {assignment.dueDate}</div>
                </div>
                <Link 
                  to={`/calendar/workspace/${encodeURIComponent(assignment.subject)}`} 
                  className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition"
                >
                  Workspace
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Calendar;
