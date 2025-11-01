import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const TeacherSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Add Assignment", path: "/add-assignment", icon: "ri-file-add-line" },
    { name: "Exam Scheduler", path: "/exam-scheduler", icon: "ri-calendar-schedule-line" },
    { name: "Upload Listing", path: "/upload-listing", icon: "ri-list-check-2" },
    { name: "Upload Notes", path: "/upload-notes", icon: "ri-upload-cloud-2-line" },
    { name: "View Assignments", path: "/teacher-assignment-view", icon: "ri-book-open-line" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("selectedRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900 w-64 p-5 border-r-2 border-orange-200 shadow-lg flex flex-col">
      {/* Logo + Info */}
      <div className="flex items-center mb-10 p-3 bg-white rounded-xl shadow-md border border-orange-200">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md">
          <span className="text-2xl font-bold text-white">CL</span>
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">Codinglab</h2>
          <p className="text-sm text-orange-700 font-medium">Teacher Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 p-3 rounded-xl w-full text-left transition-all duration-300 shadow-sm border
                ${
                  isActive
                    ? "bg-orange-500 text-white border-orange-500 shadow-md"
                    : "bg-white text-gray-700 hover:bg-orange-50 border-orange-100 hover:border-orange-300"
                }`}
            >
              <i
                className={`${item.icon} text-lg ${
                  isActive ? "text-white" : "text-orange-500 group-hover:text-orange-600"
                }`}
              ></i>
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm w-full text-left"
        >
          <i className="ri-logout-box-line text-orange-500 group-hover:text-orange-700 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;
