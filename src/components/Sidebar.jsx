import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-black text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-blue-700">
        Assignment Markaz
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="hover:text-primary">Dashboard</Link>
          </li>
          <li>
            <Link to="/courses" className="hover:text-primary">Courses</Link>
          </li>
          <li>
            <Link to="/calendar" className="hover:text-primary">Calendar</Link>
          </li>
          <li>
            <Link to="/groups" className="hover:text-primary">Groups</Link>
          </li>
          <li>
            <a href="#" className="hover:text-primary">Notifications</a>
          </li>
          <li>
            <a href="#" className="hover:text-primary">Settings</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
