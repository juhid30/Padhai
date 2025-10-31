import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
const UploadListing = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    desc: "",
    duration: "",
    lastDateToApply: "",
    salary: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "InternshipListings"), {
        companyName: formData.companyName,
        desc: formData.desc,
        duration: formData.duration,
        lastDateToApply: formData.lastDateToApply,
        salary: formData.salary,
        title: formData.title,
        postedAt: new Date(),
      });
      setSuccessMessage("Internship listing posted successfully!");
      setLoading(false);
      setFormData({
        companyName: "",
        desc: "",
        duration: "",
        lastDateToApply: "",
        salary: "",
        title: "",
      });
    } catch (error) {
      console.error("Error posting internship: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 py-10 w-[100%]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-orange-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
          Post New Internship
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="companyName"
            >
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
              placeholder="Deutsche Bank"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="title"
            >
              Internship Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
              placeholder="Web Developer"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
              placeholder="Describe the internship..."
              rows="4"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="duration"
            >
              Duration
            </label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
              placeholder="6 months"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="lastDateToApply"
            >
              Last Date to Apply
            </label>
            <input
              type="datetime-local"
              id="lastDateToApply"
              name="lastDateToApply"
              value={formData.lastDateToApply}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
            />
          </div>

          <div>
            <label
              className="block mb-2 text-sm font-semibold text-gray-800"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-orange-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 bg-orange-50"
              placeholder="50000"
            />
          </div>

          {loading ? (
            <button
              disabled
              className="w-full py-3 px-4 bg-orange-400 text-white font-bold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
            >
              Posting...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transform hover:scale-105 transition-all duration-200"
            >
              Post Internship
            </button>
          )}

          {successMessage && (
            <p className="text-green-600 text-center mt-4 font-semibold bg-green-50 py-2 rounded-lg border border-green-200">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadListing;