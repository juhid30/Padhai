import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Map, 
  Code, 
  Briefcase, 
  Building2, 
  FileSearch, 
  FileText, 
  ClipboardList,
  LogOut,
  Sparkles
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const studentRoutes = [
    { path: "/skills", name: "Skills", icon: Sparkles },
    { path: "/roadmap", name: "Roadmap", icon: Map },
    { path: "/coding-platform", name: "CodingPlatform", icon: Code },
    { path: "/hr", name: "HR Interview Prep", icon: Briefcase },
    { path: "/internship-fetch", name: "Internships", icon: Building2 },
    { path: "/plagiarism-checker", name: "Plagiarism Checker", icon: FileSearch },
    { path: "/resume-upload", name: "Resume Scoring", icon: FileText },
    { path: "/assignment-submission", name: "Assignments", icon: ClipboardList },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-mint-100 w-64 p-6 flex flex-col shadow-xl border-r border-emerald-100">
      {/* Logo and User Info */}
      <div className="mb-8 mt-2">
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-500 p-4 rounded-2xl shadow-md hover:shadow-emerald-300/50 transition-all duration-300 mb-4 group hover:scale-105">
          <div className="flex items-center justify-center">
            <span className="text-3xl font-bold text-white tracking-tight">CL</span>
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-emerald-800 mb-1">Codinglab</h2>
          <p className="text-sm text-emerald-600 font-medium">Student Portal</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {studentRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <li key={route.path}>
                <button
                  onClick={() => navigate(route.path)}
                  className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-gradient-to-r hover:from-emerald-50 hover:to-mint-50 w-full text-left transition-all duration-200 hover:translate-x-1 hover:shadow-md border border-emerald-100 hover:border-emerald-300 group"
                >
                  <Icon className="w-5 h-5 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                  <span className="text-sm text-gray-800 font-medium group-hover:text-emerald-800">
                    {route.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-emerald-100">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center space-x-3 p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl hover:from-emerald-700 hover:to-emerald-800 w-full text-left transition-all duration-200 hover:shadow-lg group"
        >
          <LogOut className="w-5 h-5 text-white" />
          <span className="text-sm text-white font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;