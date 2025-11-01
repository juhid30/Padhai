import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import Sidebar from "./Sidebar";

const TeacherDashboard = () => {
  // Sample schedule data
  const schedule = [
    {
      date: "September 21, 2024",
      classes: [
        { batch: "SE C1", time: "9:00 AM - 10:00 AM" },
        { batch: "TE C1", time: "10:00 AM - 11:00 AM" },
        { batch: "TE C3", time: "11:00 AM - 12:00 PM" },
      ],
    },
    {
      date: "September 22, 2024",
      classes: [
        { batch: "BE C2", time: "9:00 AM - 10:00 AM" },
        { batch: "TE C2", time: "10:00 AM - 11:00 AM" },
        { batch: "SE C3", time: "11:00 AM - 12:00 PM" },
      ],
    },
    {
      date: "September 23, 2024",
      classes: [
        { batch: "SE C2", time: "9:00 AM - 10:00 AM" },
        { batch: "BE C3", time: "10:00 AM - 11:00 AM" },
        { batch: "BE C1", time: "11:00 AM - 12:00 PM" },
      ],
    },
  ];

  return (
    <div className="flex w-screen h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* <Sidebar/> */}
      <div className="flex w-64">
        <TeacherSidebar />
      </div>

      {/* Main Dashboard Section */}
      <div className="flex w-full h-full gap-6 p-6">
        <div className="flex flex-col w-1/2 h-full gap-6">
          {/* First Row (Upper Part) */}
          <div
            className="flex w-full h-1/2 items-center justify-center cursor-pointer group"
            onClick={() => (window.location.href = "/add-assignment")}
          >
            <div className="w-full h-full bg-white/95 backdrop-blur-sm border-2 border-orange-200 flex items-center justify-center relative rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 overflow-hidden hover:scale-[1.02]">
              <img
                src="../assignment.png"
                alt="Upload Assignment"
                className="w-full h-full object-cover rounded-3xl opacity-25 group-hover:opacity-15 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-300/40 to-amber-400/40 group-hover:from-orange-400/60 group-hover:to-amber-500/60 transition-all duration-300 rounded-3xl">
                <span className="text-gray-900 text-4xl font-bold group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  Upload Assignment
                </span>
              </div>
            </div>
          </div>

          {/* Second Row (Lower Part) */}
          <div className="flex w-full h-1/2 items-center justify-center cursor-pointer group">
            <div className="w-full h-full bg-white/95 backdrop-blur-sm border-2 border-orange-200 flex items-center justify-center relative rounded-3xl shadow-lg hover:shadow-2xl hover:shadow-orange-200 transition-all duration-300 overflow-hidden hover:scale-[1.02]">
              <img
                src="internship.png"
                alt="Upload Internship"
                className="w-full h-full object-cover rounded-3xl opacity-25 group-hover:opacity-15 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-300/40 to-amber-400/40 group-hover:from-orange-400/60 group-hover:to-amber-500/60 transition-all duration-300 rounded-3xl">
                <span className="text-gray-900 text-4xl font-bold group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">
                  Upload Internship
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Right Section with border and margin */}
        <div className="flex w-1/2 h-full">
          <div className="flex flex-col w-full h-full overflow-y-auto bg-white/95 backdrop-blur-sm border-2 border-orange-200 rounded-3xl shadow-lg">
            {/* Sticky Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 backdrop-blur-sm z-10 px-6 py-5 rounded-t-3xl shadow-md">
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center">
                <span className="mr-3">📅</span>
                Schedule
              </h2>
            </div>

            <div className="px-6 py-4">
              {schedule.map((day, index) => (
                <div key={index} className="mb-8">
                  {/* Date Header */}
                  <div className="flex items-center mb-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                    <h2 className="text-lg text-gray-800 font-bold uppercase tracking-wide">
                      {day.date}
                    </h2>
                  </div>
                  <hr className="border-orange-200 mb-4" />
                  {/* Class Batches */}
                  <div className="space-y-3">
                    {day.classes.map((classInfo, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl shadow-sm hover:shadow-md border-2 border-orange-200 hover:border-orange-400 hover:scale-[1.02] transition-all duration-200"
                      >
                        <span className="font-bold text-gray-900 text-lg">
                          {classInfo.batch}
                        </span>
                        <span className="text-sm text-orange-700 font-semibold bg-orange-100 px-3 py-1 rounded-xl">
                          {classInfo.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
