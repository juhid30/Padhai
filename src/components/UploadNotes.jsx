import React, { useState } from "react";
import { db, storage } from "../../firebase"; 
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { GoogleGenerativeAI } from "@google/generative-ai";

const UploadNotes = () => {
  const [documentName, setDocumentName] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [year, setYear] = useState("");
  const [responseText, setResponseText] = useState(""); 
  const [teacherId, setTeacherId] = useState("example");
  const [isUploading, setIsUploading] = useState(false); // New state for tracking upload

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected.");
      return;
    }

    setIsUploading(true); // Set to true when upload starts

    try {
      const base64Image = await toBase64(file);
      const API_KEY = "AIzaSyCVOV_MuOdKNFYVTQOzjtjpSDqL73FspW8 "; 
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt =
        "Tell me how accurate this information is on a scale of 1 to 100. Give me only a number and nothing else.";
      const image = {
        inlineData: {
          data: base64Image,
          mimeType: file.type,
        },
      };

      const result = await model.generateContent([prompt, image]);
      const accuracy = result.response.text();

      const storageRef = ref(storage, `notes/${file.name}`);
      await uploadString(storageRef, base64Image, "base64");

      const docURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "Notes"), {
        topic: documentName,
        subject,
        year,
        docURL,
        accuracy,
        teacherId,
      });

      setResponseText(`Document uploaded successfully! Accuracy: ${accuracy}`);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsUploading(false); // Set to false once the upload finishes
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
            <span className="text-4xl">📄</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-orange-800 mb-2 tracking-tight">
          Upload Document
        </h2>
        <p className="text-center text-orange-600 mb-8 text-sm">
          Share your notes with accuracy check ✨
        </p>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Document Name
            </label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              placeholder="Enter document name"
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
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject name"
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 placeholder-orange-300 hover:border-orange-300 transition-all duration-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Upload File
            </label>
            <label
              className="w-full p-4 flex items-center justify-center bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-2 border-orange-200 rounded-2xl cursor-pointer hover:from-orange-100 hover:to-amber-100 hover:border-orange-400 hover:scale-[1.02] transition-all duration-300 font-semibold"
              htmlFor="file-upload"
            >
              <svg
                className="w-5 h-5 mr-2"
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
              {file ? file.name : "Choose a file"}
            </label>
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-orange-700 mb-2 block flex items-center">
              <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
              Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
              className="w-full p-4 text-gray-800 bg-white/80 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-400 hover:border-orange-300 transition-all duration-300"
            >
              <option value="" disabled className="text-orange-400">
                Select Year
              </option>
              <option value={1}>First Year</option>
              <option value={2}>Second Year</option>
              <option value={3}>Third Year</option>
              <option value={4}>Fourth Year</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full p-4 mt-6 font-semibold text-lg rounded-2xl text-white transition-all duration-300 transform ${
              isUploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 hover:scale-105 hover:shadow-lg hover:shadow-orange-300"
            }`}
            disabled={isUploading}
          >
            {isUploading ? (
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
              "Upload Document"
            )}
          </button>
        </div>

        {responseText && (
          <div className="mt-6 p-4 rounded-2xl text-center font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 border-2 border-orange-300 shadow-sm">
            <p>{responseText}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadNotes;