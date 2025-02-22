import React from "react";
import { useParams, Link } from "react-router-dom";

const GroupWorkspace = () => {
  const { groupName } = useParams();
  // Sample files for group workspace
  const files = [
    { fileName: "ProjectPlan.docx", uploader: "Huzaifa" },
    { fileName: "Research.pdf", uploader: "Hashim" },
    { fileName: "DesignMockup.png", uploader: "Saleh" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shared Workspace for {groupName}</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="border border-blue-700 rounded p-2">
            <span className="font-bold">{file.fileName}</span> - Uploaded by {file.uploader}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link to="/groups" className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition">
          Back to Groups
        </Link>
      </div>
    </div>
  );
};

export default GroupWorkspace;
