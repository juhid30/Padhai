import React, { useEffect, useState } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import { doc, getDoc } from "firebase/firestore"; // Import getDoc
import { db } from "../../firebase"; // Ensure you're importing your Firestore db
import Sidebar from "./Sidebar";
import AssignmentSubmission from "./AssignmentSubmission";
import CalendarComponent from "./Calendar";

// Register Chart.js components
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
import { useNavigate } from "react-router-dom";

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

  // Check if student data is available before accessing properties
  const ATSRating =
    student?.resume_analysis?.response?.resume_evaluation?.rating?.score * 10 ||
    0; // Default to 0 if not available

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
        backgroundColor: ["#10b981", "#d1fae5"],
        hoverBackgroundColor: ["#059669", "#a7f3d0"],
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
          font: {
            size: 13,
            weight: "500",
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: "rgba(16, 185, 129, 0.1)",
        },
        ticks: {
          color: "#059669",
        },
      },
      x: {
        grid: {
          color: "rgba(16, 185, 129, 0.1)",
        },
        ticks: {
          color: "#059669",
        },
      },
    },
  };
  const handleHRSimulatorClick = () => {
    navigate("/hr"); // Redirect to /hr when the div is clicked
  };

  return (
    
    <div className="flex">
      <Sidebar/>
      <div className="flex-1 bg-gradient-to-br from-emerald-50 via-mint-50 to-green-50 p-6 min-h-screen">
        <h1 className="text-4xl font-bold mb-8 text-emerald-800 tracking-tight">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100 overflow-hidden h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Assignments
            </h2>
            <div className="overflow-hidden h-full">
              <AssignmentSubmission />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100">
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Attendance
            </h2>
            <div className="h-48">
              <Line data={attendanceData} options={attendanceOptions} />
            </div>
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100">
            <h2 className="text-xl font-semibold mb-4 text-emerald-700 flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
              Resume
            </h2>
            <Doughnut data={resumeData} />
          </div>
        </div>
        <div className="flex h-[55vh] gap-6 mt-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 h-full w-[70%] rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-100">
            <CalendarComponent />
          </div>
          <div
            className="bg-gradient-to-br from-emerald-50 to-mint-100 p-6 w-[30%] rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-emerald-200 flex items-center justify-center cursor-pointer group"
            onClick={handleHRSimulatorClick}
          >
            <img
              src={`https://firebasestorage.googleapis.com/v0/b/webcade2024.appspot.com/o/hr-sim.png?alt=media&token=a753ade0-891c-4352-954d-18c5362df112`}
              alt=""
              className="flex items-center justify-center h-[250px] w-[250px] group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;