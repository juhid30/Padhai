import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AssignmentSubmission from "./AssignmentSubmission";
import CalendarComponent from "./Calendar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import StudentSidebar from "./StudentSidebar";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const studId = "library-test-student";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const docRef = doc(db, "Student", studId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudent(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching student data: ", error);
      }
    };
    fetchStudent();
  }, []);

  const ATSRating =
    student?.resume_analysis?.response?.resume_evaluation?.rating?.score * 10 ||
    0;

  const attendanceData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Attendance (%)",
        data: [80, 85, 90, 95],
        fill: true,
        backgroundColor: "rgba(16, 185, 129, 0.15)",
        borderColor: "rgba(5, 150, 105, 1)",
        borderWidth: 3,
        tension: 0.4,
        pointBackgroundColor: "#10b981",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const resumeData = {
    labels: ["ATS Score"],
    datasets: [
      {
        data: [ATSRating, 100 - ATSRating],
        backgroundColor: ["#10b981", "#ecfdf5"],
        hoverBackgroundColor: ["#059669", "#d1fae5"],
        borderWidth: 0,
      },
    ],
  };

  const attendanceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#064e3b",
          font: { size: 13, weight: "500" },
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(16, 185, 129, 0.1)" },
        ticks: { color: "#059669" },
      },
      x: {
        grid: { color: "rgba(16, 185, 129, 0.1)" },
        ticks: { color: "#059669" },
      },
    },
  };

  const handleHRSimulatorClick = () => navigate("/hr");

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="relative flex w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <StudentSidebar/>
      {/* Floating glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-emerald-200/30 blur-3xl rounded-full -top-10 -left-20 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-green-100/40 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>
      </div>

      <div className="flex-1 relative z-10 p-10">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl font-extrabold mb-10 text-emerald-900 tracking-tight leading-tight"
        >
          Welcome Back!
          {/* , <span className="text-emerald-600">Student 🌿</span> */}
        </motion.h1>

        {/* Top Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {/* Assignments */}
          <motion.div
            custom={0}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 backdrop-blur-2xl p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-emerald-100 overflow-hidden h-[25rem] transition-all duration-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
              Assignments
            </h2>
            <div className="overflow-y-auto h-[85%] scrollbar-thin scrollbar-thumb-emerald-300">
              <AssignmentSubmission />
            </div>
          </motion.div>

          {/* Attendance */}
          <motion.div
            custom={1}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            className="bg-white/70 backdrop-blur-2xl p-6 rounded-3xl shadow-lg hover:shadow-2xl border border-emerald-100 h-[25rem] transition-all duration-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
              Attendance Overview
            </h2>
            <div className="h-[90%]">
              <Line data={attendanceData} options={attendanceOptions} />
            </div>
          </motion.div>

          {/* ATS Rating */}
          <motion.div
            custom={2}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-br from-emerald-100/70 to-green-50/80 backdrop-blur-xl p-2 rounded-3xl shadow-lg hover:shadow-2xl border border-emerald-200 h-[25rem] flex flex-col justify-center items-center transition-all duration-500"
          >
            <h2 className="text-xl font-semibold mb-6 text-emerald-800 tracking-wide">
              Resume ATS Score
            </h2>
            <div className="relative w-60 h-60">
              <Doughnut data={resumeData} />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-800 font-extrabold text-3xl">
                {ATSRating.toFixed(0)}%
                <span className="text-sm font-medium text-emerald-500">
                  Excellent
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row h-[55vh] gap-8 mt-12"
        >
          {/* Calendar */}
          <motion.div
            custom={3}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-emerald-100 flex-1 transition-all duration-500"
          >
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full mr-3"></span>
              Calendar
            </h2>
            <CalendarComponent />
          </motion.div>

          {/* HR Simulator */}
          <motion.div
            custom={4}
            variants={cardVariants}
            whileHover={{ scale: 1.08, rotate: 0.5 }}
            onClick={handleHRSimulatorClick}
            className="bg-gradient-to-br from-emerald-100/90 via-emerald-50 to-green-100 p-6 rounded-3xl shadow-lg hover:shadow-2xl border-2 border-emerald-200 flex flex-col justify-center items-center cursor-pointer transition-all duration-500 group"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/webcade2024.appspot.com/o/hr-sim.png?alt=media&token=a753ade0-891c-4352-954d-18c5362df112"
              alt="HR Simulator"
              className="h-[250px] w-[250px] group-hover:scale-110 transition-transform duration-700"
            />
            <p className="mt-4 text-emerald-700 font-semibold text-lg tracking-wide group-hover:text-emerald-900 transition-colors duration-300">
              HR Simulator
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
