import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const BookLendingPage = () => {
  const [student, setStudent] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const studentId = "library-test-student"; // Replace with localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentDoc = await getDoc(doc(db, "Student", studentId));
        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          setStudent(studentData);
        } else {
          console.error("No such student document!");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleAddToCart = (book) => {
    if (!cart.includes(book)) {
      setCart([...cart, book]);
    }
  };

  const handleIssueBooks = async () => {
    if (studentId) {
      try {
        await updateDoc(doc(db, "Student", studentId), {
          booksBorrowed: [...(student.booksBorrowed || []), ...cart],
        });
        alert("Books issued successfully!");
        setCart([]);
        setShowCart(false);
      } catch (error) {
        console.error("Error issuing books:", error);
      }
    }
  };

  const handleCancel = () => {
    setCart([]);
    setShowCart(false);
  };

  if (!student) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 min-h-screen p-8 text-gray-900">
      <div className="container mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-orange-200">
        <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 mb-6">
          Welcome to the Library System!
        </h1>
        <h2 className="text-3xl font-bold text-center text-orange-700 mb-6">
          Hello, {student.name}
        </h2>
        
        <div className="bg-orange-50 rounded-xl p-6 mb-8 border border-orange-200 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Technical Skills:
          </h2>
          <div className="flex flex-wrap gap-3">
            {student.resume_analysis?.response?.resume_evaluation?.key_qualifications_and_experience?.technical_skills.map(
              (skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Recommended Books:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {student.recommendedBooks?.map((book, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-4 flex transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-orange-100 relative"
              >
                {book.bookImage && (
                  <div className="flex-shrink-0 h-48 w-32 overflow-hidden mr-4">
                    <img
                      src={book.bookImage}
                      alt={book.bookName}
                      className="h-full w-full object-cover rounded-lg shadow-md"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-2">
                    {book.bookName}
                  </h3>
                  <p className="text-gray-700 text-sm mb-1">
                    Author: {book.author}
                  </p>
                  <p className="text-gray-700 text-sm">
                    Available: {book.quantityAvailable}
                  </p>
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="mt-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
                  >
                    Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowCart(true)}
          className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-bold text-lg"
        >
          View Cart ({cart.length})
        </button>

        {showCart && (
          <div className="mt-6 border-2 border-orange-200 p-6 rounded-2xl bg-white shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart:</h2>
            <ul className="mt-2 space-y-2">
              {cart.map((book, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-800 bg-orange-50 px-4 py-3 rounded-lg border border-orange-100"
                >
                  <span className="font-medium">{book.bookName}</span>
                  <span className="text-orange-600 font-semibold">by {book.author}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6 gap-4">
              <button
                onClick={handleCancel}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg font-semibold flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueBooks}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg font-semibold flex-1"
              >
                Issue Books
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookLendingPage;