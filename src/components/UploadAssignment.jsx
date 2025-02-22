import React, { useState } from "react";

const UploadAssignment = ({ teacherEmail, subject }) => {
  const [file, setFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("teacherEmail", teacherEmail);
    formData.append("subject", subject);

    const response = await fetch("http://localhost:5000/api/upload-assignment", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setUploadMsg(data.message);
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button onClick={handleUpload} className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
        Upload & Send
      </button>
      {uploadMsg && <p className="mt-2 text-primary">{uploadMsg}</p>}
    </div>
  );
};

export default UploadAssignment;
