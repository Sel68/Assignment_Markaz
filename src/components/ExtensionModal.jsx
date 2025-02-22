import React, { useState } from "react";

const ExtensionModal = ({ onClose }) => {
  const [reason, setReason] = useState("");
  const [draft, setDraft] = useState("");

  const generateDraft = () => {
    const generatedDraft = `Subject: Request for extension,
    
Dear Sir,
    
I am writing to kindly request an extension for the upcoming assignment because ${reason}.

I understand the importance of adhering to deadlines. However, given the circumstances, I would greatly appreciate some additional time to ensure quality of my work.

Please let me know if this would be possible. Thank you for your understanding and cooperation.

Best regards,
Pink Goose`;
    setDraft(generatedDraft);
  };

  const sendRequest = async () => {
    // Replace with actual teacher email and subject as needed.
    const teacherEmail = "pinkgeese@assignmentmarkaz.com";
    const subject = "Sample Assignment";
    const response = await fetch("http://localhost:5000/api/request-extension", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, teacherEmail, subject }),
    });
    const data = await response.json();
    alert(data.message);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-dark border border-blue-700 rounded p-6 w-96">
        <h2 className="text-2xl font-bold mb-4">Request Extension</h2>
        <textarea 
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter your reason for extension..."
          className="w-full h-24 p-2 bg-black border border-blue-700 rounded mb-4 text-white"
        />
        <button 
          onClick={generateDraft}
          className="w-full px-4 py-2 bg-primary hover:bg-blue-600 rounded transition mb-4"
        >
          Generate Draft Email
        </button>
        {draft && (
          <div className="bg-black border border-blue-700 p-4 rounded mb-4">
            <pre className="whitespace-pre-wrap text-white">{draft}</pre>
          </div>
        )}
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-400 rounded transition"
          >
            Cancel
          </button>
          <button 
            onClick={sendRequest}
            className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionModal;
