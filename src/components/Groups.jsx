import React, { useState } from "react";
import { Link } from "react-router-dom";

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      groupName: "World Domination",
      members: ["You", "Asta", "Noelle", "Dorothy"]
    },
    {
      groupName: "DSA 131",
      members: ["You", "Sheikh", "Jas"]
    },
    {
      groupName: "HACK 151",
      members: ["You", "Huzaifa", "Hashim", "Saleh", "Anas"]
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");

  const addGroup = () => {
    const membersArray = members.split(",").map(m => m.trim()).filter(m => m);
    const newGroup = { groupName, members: membersArray };
    setGroups([...groups, newGroup]);
    setGroupName("");
    setMembers("");
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      <button
        className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition mb-4"
        onClick={() => setShowForm(true)}
      >
        Add New Group
      </button>
      {showForm && (
        <div className="mb-4 border border-blue-700 p-4 rounded">
          <input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 bg-black border border-blue-700 rounded mb-2 text-white"
          />
          <input
            type="text"
            placeholder="Members (comma separated)"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
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
              onClick={addGroup}
            >
              Save Group
            </button>
          </div>
        </div>
      )}
      <div>
        {groups.length === 0 ? (
          <p>No groups available.</p>
        ) : (
          <ul className="space-y-4">
            {groups.map((group, index) => (
              <li key={index} className="border border-blue-700 rounded p-4">
                <div className="font-bold">{group.groupName}</div>
                <div className="mt-2">
                  <span className="font-semibold">Members: </span>
                  {group.members.join(", ")}
                </div>
                <div className="mt-2">
                  <Link 
                    to={`/groups/workspace/${encodeURIComponent(group.groupName)}`}
                    className="px-4 py-2 bg-primary hover:bg-blue-600 rounded transition"
                  >
                    Go to Shared Workspace
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Groups;
