// Sidebar Component (src/components/Sidebar.js)
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Book, Calendar, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-black text-white flex flex-col p-4">
      <div className="flex items-center mb-8">
        <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
        <h1 className="text-2xl font-bold">Assignment Markaz</h1>
      </div>
      <nav className="flex flex-col gap-4">
        <NavLink to="/" className={({ isActive }) => isActive ? 'text-blue-500 flex items-center' : 'flex items-center'}>
          <Home className="mr-2" /> Dashboard
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => isActive ? 'text-blue-500 flex items-center' : 'flex items-center'}>
          <Book className="mr-2" /> Courses
        </NavLink>
        <NavLink to="/calendar" className={({ isActive }) => isActive ? 'text-blue-500 flex items-center' : 'flex items-center'}>
          <Calendar className="mr-2" /> Calendar
        </NavLink>
        <NavLink to="/groups" className={({ isActive }) => isActive ? 'text-blue-500 flex items-center' : 'flex items-center'}>
          <Users className="mr-2" /> Groups
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

// Ensure the 'logo.png' is present in the 'public' directory and then run the app.