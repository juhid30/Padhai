import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useToast } from "@chakra-ui/react"; // Import useToast from Chakra UI

const AddAssignmentForm = () => {
  const [subject, setSubject] = useState("");
  const [assignmentTopic, setAssignmentTopic] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [file, setFile] = useState(null);
  const [teacherId, setTeacherId] = useState(""); // Teacher ID
  const [year, setYear] = useState(""); // Year for the assignment

  const toast = useToast(); // Chakra UI's useToast hook

  // Today's date as date of assignment
  const dateOfAssignment = new Date().toISOString().split("T")[0];

  // Handle file input
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create Date object for due date
    const dos = dueDate ? new Date(dueDate) : null;

    // Ensure the due date is valid
    if (dos && isNaN(dos.getTime())) {
      console.error("Invalid due date:", dueDate);
      return;
    }

    const assignmentData = {
      doa: dateOfAssignment, // Date of assignment
      dos, // Due date
      subject, // Subject of the assignment
      teacherId, // Teacher ID
      topic: assignmentTopic, // Assignment topic
      year, // Year of the student
    };

    try {
      // Add assignmentData to "AssignmentRecord" collection in Firestore
      await addDoc(collection(db, "AssignmentRecord"), assignmentData);

      // Show success toast
      toast({
        title: "Assignment added.",
        description: "The assignment has been successfully added.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      // Reset form fields
      setSubject("");
      setAssignmentTopic("");
      setDueDate("");
      setFile(null);
      setYear("");
    } catch (error) {
      console.error("Error adding assignment: ", error);

      // Show error toast if submission fails
      toast({
        title: "Error.",
        description: "There was an error adding the assignment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-3xl mb-4 shadow-md">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Add Assignment
          </h2>
          <p className="text-gray-500 text-sm font-medium">Create and share assignments with your students ✨</p>
        </div>

        {/* Form Section */}
        <form
          className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 border border-blue-200/50"
          onSubmit={handleSubmit}
        >
          <div className="space-y-5">
            {/* Subject Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Mathematics, Physics"
                required
                className="w-full px-4 py-3 text-gray-800 bg-blue-50/50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Assignment Topic Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Assignment Topic
              </label>
              <input
                type="text"
                value={assignmentTopic}
                onChange={(e) => setAssignmentTopic(e.target.value)}
                placeholder="e.g., Calculus Problem Set 3"
                required
                className="w-full px-4 py-3 text-gray-800 bg-blue-50/50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-200 placeholder-gray-400"
              />
            </div>

            {/* Due Date Input */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-800 bg-blue-50/50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-200"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Attachment
              </label>
              <label
                className="w-full px-4 py-3 flex items-center justify-center bg-gradient-to-r from-blue-100/60 to-blue-200/60 text-blue-600 border-2 border-blue-300/50 rounded-2xl cursor-pointer hover:from-blue-200/70 hover:to-blue-300/70 hover:border-blue-400 transition-all duration-200 group"
                htmlFor="file-upload"
              >
                <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="font-semibold">
                  {file ? file.name : "Choose a file to upload"}
                </span>
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* Year Select */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                className="w-full px-4 py-3 text-gray-800 bg-blue-50/50 border-2 border-blue-200 rounded-2xl focus:outline-none focus:border-blue-400 focus:bg-white/80 transition-all duration-200 appearance-none cursor-pointer font-medium"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25rem'
                }}
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value={1}>First Year</option>
                <option value={2}>Second Year</option>
                <option value={3}>Third Year</option>
                <option value={4}>Fourth Year</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold text-lg rounded-2xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssignmentForm;