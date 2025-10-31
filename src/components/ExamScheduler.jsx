import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const ExamScheduler = () => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [startTime, setStartTime] = useState("");
  const [end, setEnd] = useState("");
  const [endTime, setEndTime] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [year, setYear] = useState("");

  // Firebase API call
  const addTestToFirebase = async (testData) => {
    try {
      const docRef = await addDoc(collection(db, "EventScheduling"), testData);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && start && startTime && end && year) {
      const testData = allDay
        ? { title, start, allDay: true, year }
        : {
            title,
            start: `${start}T${startTime}:00`,
            end: `${end}T${endTime}:00`,
            year,
          };

      addTestToFirebase(testData);
    } else {
      console.log("All fields are required");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-[100%] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <form
        className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-3xl shadow-2xl border-2 border-orange-200 p-10 hover:shadow-orange-200 transition-shadow duration-300"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">📝</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-2 tracking-tight">
          Schedule a Test
        </h2>
        <p className="text-center text-orange-600 mb-8 text-sm">
          Plan your exam schedule effortlessly ✨
        </p>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Test Title"
          required
          className="w-full p-4 mb-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-400 hover:border-orange-300 transition-all duration-300"
        />

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full p-4 mb-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
        >
          <option value="" disabled className="text-orange-400">
            Select Year
          </option>
          <option value="1">First Year</option>
          <option value="2">Second Year</option>
          <option value="3">Third Year</option>
          <option value="4">Fourth Year</option>
        </select>

        <div className="mb-4">
          <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            Start Date
          </label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
            className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            End Date
          </label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
            <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
          />
        </div>

        <div className="flex items-center p-4 bg-orange-50 rounded-2xl border-2 border-orange-200 mb-6">
          <input
            type="checkbox"
            id="all-day"
            checked={allDay}
            onChange={(e) => setAllDay(e.target.checked)}
            className="h-5 w-5 text-orange-600 focus:ring-4 focus:ring-orange-300 rounded-lg border-2 border-orange-300 cursor-pointer"
          />
          <label
            htmlFor="all-day"
            className="ml-3 text-base font-semibold text-gray-800 cursor-pointer"
          >
            All Day Event
          </label>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold text-lg rounded-2xl hover:from-orange-600 hover:to-amber-700 hover:scale-105 hover:shadow-lg hover:shadow-orange-300 transition-all duration-300 transform"
          >
            Schedule Test
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamScheduler;