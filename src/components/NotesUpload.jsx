import React, { useState } from "react";
import { db } from "../../firebase"; // Ensure the path to your firebase file is correct
import { collection, addDoc } from "firebase/firestore";

const NotesUpload = () => {
  const [docURL, setDocURL] = useState("");
  const [subject, setSubject] = useState("");
  const [teacherID, setTeacherID] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addDoc(collection(db, "Notes"), {
        docURL,
        dou: new Date(), // Current timestamp
        subject,
        teacherID,
        topic,
      });
      setDocURL("");
      setSubject("");
      setTeacherID("");
      setTopic("");
      alert("Note uploaded successfully!");
    } catch (err) {
      setError("Failed to upload note. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-orange-200 p-10 hover:shadow-orange-200 transition-shadow duration-300">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">📚</span>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-orange-800 mb-2 tracking-tight">
          Upload Note
        </h2>
        <p className="text-center text-orange-600 mb-8 text-sm">
          Share knowledge with your students ✨
        </p>

        <form onSubmit={handleUpload} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Document URL
            </label>
            <input
              type="text"
              placeholder="Enter document link"
              value={docURL}
              onChange={(e) => setDocURL(e.target.value)}
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-300 hover:border-orange-300 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-300 hover:border-orange-300 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Teacher ID
            </label>
            <input
              type="text"
              placeholder="Enter teacher ID"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-300 hover:border-orange-300 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Topic
            </label>
            <input
              type="text"
              placeholder="Enter topic name"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-300 hover:border-orange-300 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full p-4 mt-6 font-semibold text-lg rounded-2xl text-white transition-all duration-300 transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:scale-105 hover:shadow-lg hover:shadow-orange-300"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Uploading...
              </span>
            ) : (
              "Upload Note"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-2xl text-center font-medium bg-red-100 text-red-800 border-2 border-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesUpload;