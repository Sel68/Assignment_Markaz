import React, { useState } from "react";

const Courses = ({ courses, setCourses }) => {
  const [showForm, setShowForm] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [platform, setPlatform] = useState("Email to teacher");
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const addCourse = () => {
    const newCourse = { 
      courseName, 
      platform, 
      teacherName, 
      teacherEmail: platform === "Email to teacher" ? teacherEmail : "" 
    };
    setCourses([...courses, newCourse]);
    setCourseName("");
    setPlatform("Email to teacher");
    setTeacherName("");
    setTeacherEmail("");
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <button
        className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition mb-4"
        onClick={() => setShowForm(true)}
      >
        Add Course
      </button>
      {showForm && (
        <div className="mb-4 border border-blue-700 p-4 rounded">
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          />
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          >
            <option>Email to teacher</option>
            <option>Link with my MS Teams</option>
            <option>Submit in Class</option>
          </select>
          {platform === "Email to teacher" && (
            <input
              type="email"
              placeholder="Teacher Email Address"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
            />
          )}
          <input
            type="text"
            placeholder="Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          />
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded transition"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition"
              onClick={addCourse}
            >
              Save Course
            </button>
          </div>
        </div>
      )}
      <div>
        {courses.length === 0 ? (
          <p>No courses added yet.</p>
        ) : (
          <ul className="space-y-2">
            {courses.map((course, index) => (
              <li key={index} className="border border-blue-700 rounded p-2">
                <div className="font-bold">{course.courseName}</div>
                <div>Platform: {course.platform}</div>
                <div>Teacher: {course.teacherName}</div>
                {course.platform === "Email to teacher" && course.teacherEmail && (
                  <div>Email: {course.teacherEmail}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Courses;
