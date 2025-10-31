import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  // Retrieve the role from localStorage
  const role = localStorage.getItem("selectedRole");

  const studentRoutes = [
    { path: "/assignment-submission", name: "Assignment Submission" },
    { path: "/plagiarism-checker", name: "Plagiarism Checker" },
    { path: "/book-lending", name: "Book Lending" },
    { path: "/borrowed-books", name: "Borrowed Books" },
    { path: "/calendar", name: "Calendar" },
    { path: "/coding-platform", name: "Coding Platform" },
    { path: "/notes", name: "Notes" },
    { path: "/skills", name: "Skills" },
    { path: "/roadmap", name: "Roadmap" },
  ];

  const teacherRoutes = [
    { path: "/exam-scheduler", name: "Exam Scheduler" },
    { path: "/upload-notes", name: "Upload Notes" },
    { path: "/upload-listing", name: "Upload Listing" },
    { path: "/add-assignment", name: "Add Assignment" },
    { path: "/teacher-assignment-view", name: "Teacher Assignment View" },
  ];

  // Determine the routes based on the user's role
  const routes = role === "Student" ? studentRoutes : teacherRoutes || [];

  const handleLogout = () => {
    // Clear role from local storage
    localStorage.removeItem("userRole");
    // Navigate to home
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-emerald-900 text-white w-64 p-5 flex flex-col shadow-2xl">
      {/* Logo and User Info */}
      <div className="flex items-center mb-10 mt-4">
        <div className="bg-emerald-500 p-3 rounded-xl shadow-lg hover:shadow-emerald-400/30 transition-all duration-300">
          <span className="text-2xl font-bold text-white">CL</span>
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-mint-green">Codinglab</h2>
          <p className="text-sm text-emerald-200 font-medium">Web developer</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-3 flex-1">
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <button
                onClick={() => navigate(route.path)}
                className="flex items-center space-x-2 p-3 bg-shamrock-green rounded-xl hover:bg-emerald-600 w-full text-left mt-2 transition-all duration-200 hover:translate-x-1 hover:shadow-lg border border-emerald-700 hover:border-emerald-400 group"
              >
                <span className="text-emerald-50 font-medium group-hover:text-white">{route.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 p-3 bg-emerald-800 rounded-xl hover:bg-emerald-700 w-full text-left transition-all duration-200 hover:shadow-lg border border-emerald-700 hover:border-emerald-400 group"
        >
          <span className="text-emerald-100 font-medium group-hover:text-white">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;