import { doc, updateDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../firebase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    // Retrieve student ID from local storage
    const studentId = "library-test-student"; // localStorage.getItem("studentId");

    if (!studentId) {
      setMessage("Student ID not found in local storage.");
      setLoading(false); // Reset loading
      return;
    }

    if (!file) {
      setMessage("Please select a file first.");
      setLoading(false); // Reset loading
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const resumeAnalysis = await response.json();

        console.log(resumeAnalysis);
        const studentRef = doc(db, "Student", studentId);
        await updateDoc(studentRef, {
          resume_analysis: resumeAnalysis,
        });

        setMessage("File uploaded and resume analysis updated successfully!");
        navigate("/student-dashboard");
      } else {
        setMessage("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during upload.");
    } finally {
      setLoading(false); // Reset loading at the end
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-mint-50 to-green-50 p-8">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl p-10 w-full max-w-md border-2 border-emerald-100 hover:shadow-emerald-200 transition-all duration-300">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-2 text-center text-emerald-800 tracking-tight">
          Upload Your Resume
        </h3>
        <p className="text-center text-emerald-600 mb-8 text-sm">
          Let's get your profile ready ✨
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="file"
              className="border-2 border-emerald-200 rounded-2xl p-4 w-full transition duration-300 focus:ring-4 focus:ring-emerald-300 focus:border-emerald-400 bg-white/80 hover:border-emerald-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer"
              onChange={handleFileChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`mt-4 px-6 py-4 rounded-2xl text-white w-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:shadow-emerald-300"
            }`}
            disabled={loading}
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
              "Submit"
            )}
          </button>
        </form>
        {message && (
          <div
            className={`mt-6 p-4 rounded-2xl text-center font-medium ${
              message.includes("successfully")
                ? "bg-emerald-100 text-emerald-800 border-2 border-emerald-200"
                : "bg-red-100 text-red-800 border-2 border-red-200"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;