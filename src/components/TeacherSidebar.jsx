import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the selectedRole from local storage
    localStorage.removeItem('selectedRole');
    
    // Navigate to the home page
    navigate('/');
    
    // Reload the window
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 text-gray-900 w-64 p-5 border-r-2 border-orange-200 shadow-lg">
      {/* Logo and User Info */}
      <div className="flex items-center mb-10 p-3 bg-white rounded-xl shadow-md border border-orange-200">
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl shadow-md">
          <span className="text-2xl font-bold text-white">CL</span>
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-bold text-gray-800">Codinglab</h2>
          <p className="text-sm text-orange-700 font-medium">Web developer</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-3">
        <a href="#dashboard" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-home-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Dashboard</span>
        </a>
        <a href="#revenue" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-bar-chart-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Revenue</span>
        </a>
        <a href="#notifications" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-notification-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Notifications</span>
        </a>
        <a href="#analytics" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-line-chart-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Analytics</span>
        </a>
        <a href="#likes" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-heart-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Likes</span>
        </a>
        <a href="#wallets" className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm">
          <i className="ri-wallet-line text-orange-500 group-hover:text-orange-600 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Wallets</span>
        </a>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-6">
        <button onClick={handleLogout} className="flex items-center space-x-3 p-3 bg-white rounded-xl hover:bg-orange-50 border border-orange-100 hover:border-orange-300 transition-all duration-300 group shadow-sm w-full text-left">
          <i className="ri-logout-box-line text-orange-500 group-hover:text-orange-700 text-lg"></i>
          <span className="font-medium text-gray-700 group-hover:text-gray-900">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default TeacherSidebar;