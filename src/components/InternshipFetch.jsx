import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import SuccessModal from "./SuccessModal";
import { db } from "../../firebase";

// Main InternshipFetch Component
const InternshipFetch = () => {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const studentId = "library-test-student"; // Adjust this as needed

  // Fetch internship listings from Firestore
  useEffect(() => {
    const fetchInternships = async () => {
      const internshipsCollection = collection(db, "InternshipListings"); // Adjust the collection name as needed
      const internshipSnapshot = await getDocs(internshipsCollection);
      const internshipList = internshipSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInternships(internshipList);
    };

    fetchInternships();
  }, []); // Empty dependency array to run once on mount

  const applyToInternship = async () => {
    if (!resumeFile) {
      alert("Please upload your resume before applying.");
      return;
    }

    const resumeLink = resumeFile.name; // Adjust this after uploading to storage
    const applicationData = {
      studentId,
      internshipId: selectedInternship.id,
      resumeLink,
    };

    const studentDoc = await getDoc(doc(db, "Student", studentId));
    if (studentDoc.exists()) {
      const studentData = studentDoc.data();
      const resumeAnalysis = studentData.resume_analysis;

      // Upload application data to Firestore
      const docRef = doc(collection(db, "AppliedToInternship"));
      await setDoc(docRef, applicationData);

      alert("Application submitted successfully!");
      setIsModalOpen(false);
      setResumeFile(null); // Optionally clear the uploaded resume file
    }
  };

  const handleSelectForCompare = (internship) => {
    if (selectedForCompare.includes(internship)) {
      setSelectedForCompare(
        selectedForCompare.filter((item) => item !== internship)
      );
    } else if (selectedForCompare.length < 2) {
      setSelectedForCompare([...selectedForCompare, internship]);
    }
  };

  const submitComparison = async () => {
    if (selectedForCompare.length !== 2) {
      alert("Please select exactly 2 internships for comparison.");
      return;
    }

    const formData = new FormData();
    formData.append("job1", selectedForCompare[0]["desc"]);
    formData.append("job2", selectedForCompare[1]["desc"]);
    formData.append("job2", selectedForCompare[1]["desc"]);

    try {
      const response = await fetch("http://localhost:5000/compare_jobs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setComparisonResult(result); // Save comparison result
        setShowCompareModal(true); // Open comparison modal
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching comparison:", error);
      alert("An error occurred while fetching the comparison.");
    }
  };

  const CompareModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-3xl font-bold text-indigo-900 mb-4">
          Comparison Results
        </h2>
        {comparisonResult ? (
          <div>
            <h3 className="text-xl font-semibold mb-2">Analysis:</h3>
            <pre>{JSON.stringify(comparisonResult, null, 2)}</pre>
          </div>
        ) : (
          <p>No results to display.</p>
        )}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
            onClick={() => setShowCompareModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Internship Listings</h1>
      <ul>
        {internships.map((internship) => (
          <li key={internship.id} className="border p-4 my-2">
            <h2 className="text-xl">{internship.title}</h2>
            <p>{internship.description}</p>
            <button
              className={`mt-2 px-4 py-2 rounded hover:bg-indigo-500 ${
                selectedForCompare.includes(internship)
                  ? "bg-indigo-400"
                  : "bg-indigo-600 text-white"
              }`}
              onClick={() => handleSelectForCompare(internship)}
            >
              {selectedForCompare.includes(internship)
                ? "Deselect"
                : "Select for Comparison"}
            </button>
          </li>
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        onClick={submitComparison}
      >
        Submit Comparison
      </button>

      {isModalOpen && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-bold text-indigo-900 mb-4">
              {selectedInternship.title}
            </h2>
            {/* Resume upload and other details */}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
              onClick={applyToInternship}
            >
              Submit Application
            </button>
          </div>
        </div>
      )}

      {showCompareModal && <CompareModal />}
      <SuccessModal data={null} onClose={() => setShowCompareModal(false)} />
    </div>
  );
};

export default InternshipFetch;
