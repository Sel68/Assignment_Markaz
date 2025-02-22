import React from "react";
import { useParams, Link } from "react-router-dom";

const AssignmentWorkspace = () => {
  const { assignmentSubject } = useParams();
  // Sample files for assignment workspace
  const files = [
    { fileName: "Draft1.docx", uploader: "Student" },
    { fileName: "Draft2.docx", uploader: "Student" },
    { fileName: "FinalSubmission.pdf", uploader: "Student" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Workspace for {assignmentSubject}</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="border border-blue-700 rounded p-2">
            <span className="font-bold">{file.fileName}</span> - Uploaded by {file.uploader}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/calendar" className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
          Back to Calendar
        </Link>
      </div>
    </div>
  );
};

export default AssignmentWorkspace;
