import React from 'react';

const DashboardPage = () => {
  // Sample data for dashboard sections
  const studentMetrics = {
    attendance: 85, // Attendance percentage
    totalAssignments: 10,
    completedAssignments: 8,
    upcomingExams: 3,
    skillsProgress: 70, // Skills progress percentage
    codingPractice: {
      completedChallenges: 45,
      totalChallenges: 50,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Welcome Back, Atharva!
          </h1>
          <p className="text-slate-600 text-lg">Here's your learning overview</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-green-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-700">Attendance</h2>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-green-600 mb-1">{studentMetrics.attendance}%</p>
            <p className="text-slate-500 text-sm">Overall Attendance</p>
          </div>

          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-700">Assignments</h2>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-1">
              {studentMetrics.completedAssignments}/{studentMetrics.totalAssignments}
            </p>
            <p className="text-slate-500 text-sm">Completed Assignments</p>
          </div>

          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-red-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-700">Upcoming Exams</h2>
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-600 mb-1">{studentMetrics.upcomingExams}</p>
            <p className="text-slate-500 text-sm">Exams This Month</p>
          </div>

          <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-indigo-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-slate-700">Skills Progress</h2>
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mb-3">
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${studentMetrics.skillsProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-slate-600 text-sm font-medium">{studentMetrics.skillsProgress}% Complete</p>
          </div>
        </div>

        {/* Coding Practice Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 rounded-2xl shadow-xl mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold">Coding Practice</h2>
            </div>
            <p className="text-2xl font-semibold mb-2">
              {studentMetrics.codingPractice.completedChallenges}/{studentMetrics.codingPractice.totalChallenges} challenges completed
            </p>
            <p className="text-purple-100 text-lg">Keep practicing to improve your coding skills!</p>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interview Prep Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Interview Preparation</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Prepare for your upcoming interviews with mock tests, coding problems, and quizzes.
            </p>
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Interview Prep
            </button>
          </div>

          {/* Exam Scheduler Section */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Exam Scheduler</h2>
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Track and manage your upcoming exams.
            </p>
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              View Exam Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;