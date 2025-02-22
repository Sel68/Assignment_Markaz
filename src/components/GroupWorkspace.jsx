import React from "react";
import { useParams, Link } from "react-router-dom";

const GroupWorkspace = () => {
  const { groupName } = useParams();
  // Sample files with Google Drive links
  const files = [
    { fileName: "ProjectPlan.docx", uploader: "You", driveLink: "https://docs.google.com/document/d/1_WGv7YZj94X4DXyKT5_p5VjsybfunC11aqNOmxUa3Vs/edit?usp=sharing" },
    { fileName: "Research.pdf", uploader: "Huzaifa", driveLink: "https://docs.google.com/document/d/1qDwFTvTvnBVqt1yCJ3lYKnB9DrB-YpY4OYLoMZARTgE/edit?usp=sharing" },
    { fileName: "DesignMockup.png", uploader: "Hashim", driveLink: "https://docs.google.com/document/d/1-FhQ198_NIGs_5I0vNyxBr7dEHB8-WGF8h4ZsUeVQno/edit?usp=sharing" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Shared Workspace for {groupName}</h2>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={index} className="border border-blue-700 rounded p-2">
            <a href={file.driveLink} target="_blank" rel="noopener noreferrer" className="text-primary font-bold">
              {file.fileName}
            </a>{" "}
            - Uploaded by {file.uploader}
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
