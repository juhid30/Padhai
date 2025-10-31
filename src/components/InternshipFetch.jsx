import { useEffect, useState } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import SuccessModal from "./SuccessModal";
import { db } from "../../firebase";

<<<<<<< HEAD
// SuccessModal Component
const SuccessModal = ({ data, onClose }) => {
  if (!data) return null;

  const isApplicationSuccess = typeof data === 'string';

  if (isApplicationSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-2xl max-w-2xl w-full overflow-y-auto border-2 border-emerald-200">
          <h2 className="text-3xl font-bold text-emerald-800 mb-4">
            Application Submitted ✨
          </h2>
          <p className="mb-6 text-gray-700">{data}</p>
          <div className="flex justify-end">
            <button
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const { job_comparison, recommendation } = data;
  const job1 = job_comparison?.job1 || {};
  const job2 = job_comparison?.job2 || {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200">
        <h2 className="text-3xl font-bold text-emerald-800 mb-4">
          Comparison Results
        </h2>

        <div className="mb-6 bg-mint-50 p-4 rounded-xl border border-emerald-100">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Job 1</h3>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Key Qualifications and Experience:</strong>{" "}
            {job1.key_qualifications_and_experience || "N/A"}
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Potential Gaps or Areas for Exploration:</strong>{" "}
            {job1.potential_gaps_or_areas_for_exploration || "N/A"}
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Summary:</strong> {job1.summary || "N/A"}
          </p>
        </div>

        <div className="mb-6 bg-mint-50 p-4 rounded-xl border border-emerald-100">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Job 2</h3>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Key Qualifications and Experience:</strong>{" "}
            {job2.key_qualifications_and_experience || "N/A"}
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Potential Gaps or Areas for Exploration:</strong>{" "}
            {job2.potential_gaps_or_areas_for_exploration || "N/A"}
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Summary:</strong> {job2.summary || "N/A"}
          </p>
        </div>

        <div className="mb-6 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
          <h3 className="text-2xl font-semibold text-emerald-700 mb-2">
            Recommendation
          </h3>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Better Fit:</strong> {recommendation?.better_fit || "N/A"}
          </p>
          <p className="mb-2 text-gray-700">
            <strong className="text-emerald-800">Reason:</strong> {recommendation?.reason || "N/A"}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Button component
const Button = ({ children, onClick, disabled, className }) => (
  <button
    className={`px-5 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
      disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-md hover:shadow-lg"
    } ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

// Custom Checkbox component
const Checkbox = ({ checked, onChange, disabled }) => (
  <label className="inline-flex items-center">
    <input
      type="checkbox"
      className="form-checkbox h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
  </label>
);

=======
>>>>>>> e1d7dbaee135a1ce1ae6fab2ab97728aeeecd755
// Main InternshipFetch Component
const InternshipFetch = () => {
  const [internships, setInternships] = useState([]);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
<<<<<<< HEAD
  const [responseData, setResponseData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
=======
  const [resumeFile, setResumeFile] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
>>>>>>> e1d7dbaee135a1ce1ae6fab2ab97728aeeecd755
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
<<<<<<< HEAD
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200">
        <h2 className="text-3xl font-bold text-emerald-800 mb-4">Compare Internships</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {selectedForCompare.map((internship) => (
            <div key={internship.id} className="border-2 border-emerald-200 p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold text-emerald-700 mb-3">
                {internship.title}
              </h3>
              <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Company:</strong> {internship.companyName}</p>
              <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Description:</strong> {internship.desc}</p>
              <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Duration:</strong> {internship.duration}</p>
              <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Last Date to Apply:</strong> {new Date(internship.lastDateToApply.seconds * 1000).toLocaleDateString()}</p>
              <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Stipend:</strong> {internship.salary}</p>
            </div>
          ))}
        </div>
        <div className="mb-6 bg-mint-50 p-4 rounded-xl border border-emerald-100">
          <h3 className="text-xl font-semibold mb-2 text-emerald-800">Upload Your Resume</h3>
          <input
            type="file"
            onChange={handleResumeUpload}
            accept=".pdf,.doc,.docx"
            className="mb-2 text-gray-700"
          />
          {resumeFile && (
            <p className="text-sm text-emerald-600 font-medium">✓ File selected: {resumeFile.name}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={applyToInternship} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Comparison"}
          </Button>
          <Button
            onClick={() => setShowCompareModal(false)}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300"
            disabled={isSubmitting}
=======
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
>>>>>>> e1d7dbaee135a1ce1ae6fab2ab97728aeeecd755
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
<<<<<<< HEAD
    <div className="p-6 bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
          INTERNSHIPS
        </h1>
        <Button onClick={toggleCompareMode}>
          {isCompareMode ? "Cancel Compare" : "Compare"}
        </Button>
      </div>

      <hr className="border-t-2 border-emerald-200 mb-9" />

      {isCompareMode && (
        <div className="mb-4">
          <Button
            onClick={openCompareModal}
            disabled={selectedForCompare.length !== 2}
          >
            Compare Selected ({selectedForCompare.length}/2)
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {internships.map((internship) => (
          <div
            className="border-2 border-emerald-200 rounded-2xl shadow-lg p-6 bg-gradient-to-br from-white to-green-50 transition-all transform hover:scale-105 hover:shadow-xl cursor-pointer relative"
            key={internship.id}
            onClick={() => openModal(internship)}
          >
            {isCompareMode && (
              <div
                className="absolute top-3 right-3 bg-white p-1.5 rounded-lg shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedForCompare.some((i) => i.id === internship.id)}
                  onChange={() => handleCompareSelect(internship)}
                  disabled={
                    selectedForCompare.length === 2 &&
                    !selectedForCompare.find((i) => i.id === internship.id)
                  }
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold text-emerald-800 mb-2">
              {internship.title}
            </h2>
            <p className="text-emerald-700 mb-2">
              <strong className="text-emerald-800">Company:</strong> {internship.companyName}
            </p>
            <p className="text-emerald-700">
              <strong className="text-emerald-800">Duration:</strong> {internship.duration}
            </p>
          </div>
=======
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
>>>>>>> e1d7dbaee135a1ce1ae6fab2ab97728aeeecd755
        ))}
      </ul>

      <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        onClick={submitComparison}
      >
        Submit Comparison
      </button>

      {isModalOpen && selectedInternship && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-emerald-200">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">
              {selectedInternship.title}
            </h2>
<<<<<<< HEAD
            <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Company:</strong> {selectedInternship.companyName}</p>
            <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Description:</strong> {selectedInternship.desc}</p>
            <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Duration:</strong> {selectedInternship.duration}</p>
            <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Last Date to Apply:</strong> {new Date(selectedInternship.lastDateToApply.seconds * 1000).toLocaleDateString()}</p>
            <p className="mb-2 text-gray-700"><strong className="text-emerald-800">Stipend:</strong> {selectedInternship.salary}</p>

            <div className="mt-4 bg-mint-50 p-4 rounded-xl border border-emerald-100">
              <input
                type="file"
                onChange={handleResumeUpload}
                accept=".pdf,.doc,.docx"
                className="mb-2 text-gray-700"
              />
              {resumeFile && (
                <p className="text-sm text-emerald-600 font-medium">✓ File selected: {resumeFile.name}</p>
              )}
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button onClick={applyToInternship} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Apply"}
              </Button>
              <Button onClick={closeModal} className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                Close
              </Button>
            </div>
=======
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
>>>>>>> e1d7dbaee135a1ce1ae6fab2ab97728aeeecd755
          </div>
        </div>
      )}

      {showCompareModal && <CompareModal />}
      <SuccessModal data={null} onClose={() => setShowCompareModal(false)} />
    </div>
  );
};

export default InternshipFetch;