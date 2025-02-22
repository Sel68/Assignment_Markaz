import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Courses from "./components/Courses";
import Calendar from "./components/Calendar";
import Groups from "./components/Groups";
import GroupWorkspace from "./components/GroupWorkspace";
import AssignmentWorkspace from "./components/AssignmentWorkspace";
import ExtensionModal from "./components/ExtensionModal";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [showExtensionModal, setShowExtensionModal] = useState(false);

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col flex-1 bg-dark">
          <Header />
          <main className="p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard onRequestExtension={() => setShowExtensionModal(true)} />} />
              <Route path="/courses" element={<Courses courses={courses} setCourses={setCourses} />} />
              <Route path="/calendar" element={<Calendar courses={courses} />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/workspace/:groupName" element={<GroupWorkspace />} />
              <Route path="/calendar/workspace/:assignmentSubject" element={<AssignmentWorkspace />} />
            </Routes>
          </main>
        </div>
        {showExtensionModal && <ExtensionModal onClose={() => setShowExtensionModal(false)} />}
      </div>
    </Router>
  );
};

export default App;
