import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const AppliedToInternship = () => {
  const [applications, setApplications] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const applicationsSnapshot = await getDocs(collection(db, "AppliedToInternship"));
        const applicationsData = applicationsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const studentsSnapshot = await getDocs(collection(db, "Student"));
        const students = studentsSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().name;
          return acc;
        }, {});

        const internshipsSnapshot = await getDocs(collection(db, "InternshipListings"));
        const internships = internshipsSnapshot.docs.reduce((acc, doc) => {
          acc[doc.id] = doc.data().title;
          return acc;
        }, {});

        const applicationRecords = applicationsData.map((application) => ({
          studentName: students[application.studentId] || "Unknown",
          internshipTitle: internships[application.internshipId] || "Unknown",
          resumeURL: application.resumeLink,
        }));

        setApplications(applicationRecords);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, [db]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-white to-emerald-50 flex flex-col items-center pt-8">
      <div className="p-8 w-full max-w-4xl bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-2xl border-2 border-emerald-200">
        <h2 className="text-4xl sm:text-5xl text-center font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent mb-8 p-4 rounded-lg">
          Applied Internships 
        </h2>
        <hr className="border-t-2 border-emerald-300 mb-9" />
        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="w-full border-collapse bg-white rounded-xl overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-100 to-green-100">
              <tr>
                <th className="border-b-2 border-emerald-200 px-6 py-4 text-left text-emerald-800 font-bold text-sm">
                  Student Name
                </th>
                <th className="border-b-2 border-emerald-200 px-6 py-4 text-left text-emerald-800 font-bold text-sm">
                  Internship Title
                </th>
                <th className="border-b-2 border-emerald-200 px-6 py-4 text-left text-emerald-800 font-bold text-sm">
                  Resume
                </th>
              </tr>
            </thead>
            <tbody>
              {applications.map((application, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-green-50 transition-all duration-200 border-b border-emerald-100"
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {application.studentName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {application.internshipTitle}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={application.resumeURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppliedToInternship;