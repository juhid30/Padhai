import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { doc, getDoc, collection, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Fetch student details based on the student ID
const getStudentDetails = async (studentId) => {
  try {
    const studentDocRef = doc(db, "Student", studentId);
    const studentSnapshot = await getDoc(studentDocRef);

    if (studentSnapshot.exists()) {
      return studentSnapshot.data();
    } else {
      console.error("No student found with the given ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student details:", error);
    return null;
  }
};

// Fetch all assignments
const getAssignmentsForStudent = async () => {
  try {
    const assignmentsRef = collection(db, "AssignmentRecord");
    const querySnapshot = await getDocs(assignmentsRef);

    const allAssignments = [];
    querySnapshot.forEach((doc) => {
      allAssignments.push({ id: doc.id, ...doc.data() });
    });

    return allAssignments;
  } catch (error) {
    console.error("Error fetching assignments:", error);
    return [];
  }
};

const AssignmentSubmission = () => {
  const [pendingAssignments, setPendingAssignments] = useState([]);
  const [pastDueAssignments, setPastDueAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAssignmentsAndStudentData = async () => {
      const studentId = "library-test-student";
      // localStorage.getItem("studentId");

      if (studentId) {
        try {
          const studentDetails = await getStudentDetails(studentId);
          if (studentDetails) {
            const studentYear = Number(studentDetails.year);
            const allAssignments = await getAssignmentsForStudent();

            const filteredAssignments = allAssignments.filter(
              (assignment) => Number(assignment.year) === studentYear
            );

            const today = Math.round(new Date().getTime() / 1000);
            const pending = [];
            const pastDue = [];

            filteredAssignments.forEach((assignment) => {
              const dueDate = assignment.dos.seconds;
              if (today < dueDate) {
                pending.push(assignment);
              } else {
                pastDue.push(assignment);
              }
            });

            setPendingAssignments(pending);
            setPastDueAssignments(pastDue);
          }
        } catch (error) {
          console.error(
            "Error fetching assignments or student details:",
            error
          );
        }
      }
    };

    fetchAssignmentsAndStudentData();
  }, []);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (assignmentId) => {
    setSelectedAssignment(assignmentId);
    toggleModal();
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      const storageRef = ref(
        storage,
        `uploadedNotes/${selectedAssignment}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      const studentId = localStorage.getItem("studentId");
      const assignmentDocRef = doc(
        db,
        "SubmittedAssignments",
        selectedAssignment
      );

      const late = pendingAssignments.some(
        (assignment) => assignment.id === selectedAssignment
      )
        ? false
        : true;

      await setDoc(assignmentDocRef, {
        documentString: downloadURL,
        isSubmitted: true,
        submittedOn: new Date().toISOString(),
        isLate: late,
        studentId: studentId,
        assignmentId: selectedAssignment,
      });

      const newPending = pendingAssignments.filter(
        (assignment) => assignment.id !== selectedAssignment
      );
      const newPastDue = pastDueAssignments.filter(
        (assignment) => assignment.id !== selectedAssignment
      );
      console.log(newPending);
      const submittedAssignment = [
        ...pendingAssignments,
        ...pastDueAssignments,
      ].find((assignment) => assignment.id === selectedAssignment);

      setPendingAssignments(newPending);
      setPastDueAssignments(newPastDue);
      setSubmittedAssignments([...submittedAssignments, submittedAssignment]);

      setFile(null);
      toggleModal();
    } catch (error) {
      console.error("Error uploading file and updating Firestore:", error);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 rounded-3xl shadow-md w-full overflow-hidden border-2 border-green-200/50">
      {/* Pending Assignments */}
      <section className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-emerald-400 to-emerald-500 text-white p-4 rounded-2xl mb-3 transition duration-300 hover:from-emerald-500 hover:to-emerald-600 shadow-sm"
          onClick={() => toggleSection("pending")}
        >
          <h2 className="text-lg font-bold">Pending Assignments</h2>
          <span className="text-xl">{expandedSection === "pending" ? "▲" : "▼"}</span>
        </div>
        {expandedSection === "pending" && (
          <div
            style={{
              maxHeight: "120px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            className="flex flex-col space-y-4 scrollbar-hide"
          >
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col border-2 border-green-200/50"
                >
                  <h3 className="text-xl font-bold text-gray-800">{assignment.topic}</h3>
                  <p className="text-gray-600 font-medium">Subject: {assignment.subject}</p>
                  <p className="text-gray-600 font-medium">
                    Date of Assignment:{" "}
                    {new Date(assignment.doa).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 font-medium">
                    Due Date:{" "}
                    {assignment.dos
                      ? new Date(
                          assignment.dos.seconds * 1000
                        ).toLocaleDateString()
                      : "No due date"}
                  </p>
                  <button
                    onClick={() => handleSubmit(assignment.id)}
                    className="mt-3 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-bold py-2 px-4 rounded-xl transition duration-300 hover:from-emerald-500 hover:to-emerald-600 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  >
                    Submit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-medium">No pending assignments.</p>
            )}
          </div>
        )}
      </section>

      {/* Past Due Assignments */}
      <section className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-2xl mb-3 transition duration-300 hover:from-green-500 hover:to-green-600 shadow-sm"
          onClick={() => toggleSection("pastDue")}
        >
          <h2 className="text-lg font-bold">Past Due Assignments</h2>
          <span className="text-xl">{expandedSection === "pastDue" ? "▲" : "▼"}</span>
        </div>
        {expandedSection === "pastDue" && (
          <div
            style={{
              maxHeight: "120px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            className="flex flex-col space-y-4 scrollbar-hide"
          >
            {pastDueAssignments.length > 0 ? (
              pastDueAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col border-2 border-green-200/50"
                >
                  <h3 className="text-xl font-bold text-gray-800">{assignment.topic}</h3>
                  <p className="text-gray-600 font-medium">Subject: {assignment.subject}</p>
                  <p className="text-gray-600 font-medium">
                    Date of Assignment:{" "}
                    {new Date(assignment.doa).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 font-medium">
                    Due Date:{" "}
                    {assignment.dos
                      ? new Date(
                          assignment.dos.seconds * 1000
                        ).toLocaleDateString()
                      : "No due date"}
                  </p>
                  <button
                    onClick={() => handleSubmit(assignment.id)}
                    className="mt-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-2 px-4 rounded-xl transition duration-300 hover:from-gray-500 hover:to-gray-600 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  >
                    Submit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-medium">No past due assignments.</p>
            )}
          </div>
        )}
      </section>

      {/* Submitted Assignments */}
      <section className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer bg-gradient-to-r from-teal-400 to-teal-500 text-white p-4 rounded-2xl mb-3 transition duration-300 hover:from-teal-500 hover:to-teal-600 shadow-sm"
          onClick={() => toggleSection("submitted")}
        >
          <h2 className="text-lg font-bold">Submitted Assignments</h2>
          <span className="text-xl">{expandedSection === "submitted" ? "▲" : "▼"}</span>
        </div>
        {expandedSection === "submitted" && (
          <div
            style={{
              maxHeight: "120px",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
            className="flex flex-col space-y-4 scrollbar-hide"
          >
            {submittedAssignments.length > 0 ? (
              submittedAssignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl shadow-sm hover:shadow-md transition duration-300 flex flex-col border-2 border-green-200/50"
                >
                  <h3 className="text-xl font-bold text-gray-800">{assignment.topic}</h3>
                  <p className="text-gray-600 font-medium">Subject: {assignment.subject}</p>
                  <p className="text-gray-600 font-medium">
                    Submitted On:{" "}
                    {new Date(assignment.submittedOn).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 font-medium">Status: {assignment.isLate ? "Late" : "On Time"}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-medium">No submitted assignments.</p>
            )}
          </div>
        )}
      </section>

      {/* Modal for file upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg border-2 border-green-200/50 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Upload Assignment ✨</h2>
            <input 
              type="file" 
              onChange={handleFileChange}
              className="w-full mb-4 px-4 py-3 bg-green-50/50 border-2 border-green-200 rounded-2xl focus:outline-none focus:border-green-400 transition-all duration-200"
            />
            <div className="flex gap-3">
              <button
                onClick={handleUpload}
                className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-bold py-3 px-4 rounded-2xl transition duration-300 hover:from-emerald-500 hover:to-emerald-600 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                Upload
              </button>
              <button
                onClick={toggleModal}
                className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 font-bold py-3 px-4 rounded-2xl transition duration-300 hover:from-gray-400 hover:to-gray-500 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentSubmission;