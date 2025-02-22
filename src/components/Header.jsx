import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-6 bg-black border-b border-blue-700">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
          U
        </div>
      </div>
    </header>
  );
};

export default Header;
