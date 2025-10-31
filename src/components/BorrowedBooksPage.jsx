import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { db } from "../../firebase"; // Your Firebase config file
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const BorrowedBooksPage = () => {
  const [students, setStudents] = useState([]);
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Use the navigate hook

  // Fetch students and filter out those with no borrowed books
  const fetchStudents = async () => {
    const studentsCollection = collection(db, "Student");
    const studentsSnapshot = await getDocs(studentsCollection);
    const studentsList = await Promise.all(
      studentsSnapshot.docs.map(async (studentDoc) => {
        const studentData = studentDoc.data();
        const borrowedBooks = studentData.booksBorrowed || [];
        return borrowedBooks.length > 0
          ? {
              id: studentDoc.id,
              name: studentData.name || "Unknown Student",
              books: borrowedBooks,
            }
          : null;
      })
    );
    setStudents(studentsList.filter((student) => student !== null)); // Only include students with borrowed books
  };

  // Return book function and remove student if no books left
  const returnBook = async (studentId, bookId) => {
    const studentRef = doc(db, "Student", studentId);
    const studentSnap = await getDoc(studentRef);
    if (studentSnap.exists()) {
      const data = studentSnap.data();
      const updatedBooks = data.booksBorrowed.filter(
        (book) => book.bookId !== bookId
      );

      await updateDoc(studentRef, { booksBorrowed: updatedBooks });

      // Update UI after returning the book
      setStudents(
        (prevStudents) =>
          prevStudents
            .map((student) =>
              student.id === studentId
                ? { ...student, books: updatedBooks }
                : student
            )
            .filter((student) => student.books.length > 0) // Remove student from list if no books are left
      );

      alert("Book has been returned.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search filter for student names
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Remove selectedRole from localStorage
    navigate("/"); // Navigate to the login page
    window.location.reload(); // Reload the page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-6 w-full">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-orange-200">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
        >
          Logout
        </button>

        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-8">
          Borrowed Books
        </h1>

        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 border border-orange-200 rounded-xl mb-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50 text-gray-800 placeholder-gray-600"
        />
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div key={student.id} className="mb-6">
              <div
                className="flex justify-between items-center p-5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-orange-200 hover:border-orange-300"
                onClick={() =>
                  setExpandedStudentId(
                    expandedStudentId === student.id ? null : student.id
                  )
                }
              >
                <h2 className="text-xl font-bold text-gray-900">
                  {student.name}
                </h2>
                {student.books.length > 0 && (
                  <button className="text-orange-600 font-semibold hover:text-orange-700 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg">
                    {expandedStudentId === student.id
                      ? "Hide Books"
                      : `Show Books (${student.books.length})`}
                  </button>
                )}
              </div>
              {expandedStudentId === student.id && student.books.length > 0 && (
                <div className="p-6 bg-orange-50 rounded-b-xl border border-orange-200 border-t-0 shadow-inner">
                  {student.books.map((book) => (
                    <div
                      key={book.bookId}
                      className="flex items-center justify-between p-4 mb-4 bg-white rounded-lg shadow-md border border-orange-100 hover:shadow-lg transition-all duration-200 last:mb-0"
                    >
                      <div className="flex items-center">
                        <img
                          src={book.bookImage}
                          alt={book.bookName}
                          className="w-16 h-20 object-cover mr-4 rounded-lg shadow-md"
                        />
                        <div>
                          <p className="text-gray-900 font-bold text-lg">
                            {book.bookName}
                          </p>
                          <p className="text-gray-700 text-sm mt-1">
                            Issued on: {book.dateOfIssue}
                          </p>
                          <p className="text-gray-700 text-sm">
                            Due: {book.dueDate}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => returnBook(student.id, book.bookId)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold transform hover:scale-105"
                      >
                        Return
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg bg-orange-50 py-6 rounded-xl border border-orange-200 shadow-inner">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BorrowedBooksPage;