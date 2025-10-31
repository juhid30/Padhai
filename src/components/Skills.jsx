import React, { useState } from "react";
import { motion } from "framer-motion";
import { topics } from "../assets/quizData";

const Skill = ({ name, x, y, onClick, isClicked }) => {
  return (
    <motion.div
      className={`flex items-center justify-center rounded-full font-semibold py-3 px-6 shadow-lg cursor-pointer absolute
        lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:font-bold
        ${isClicked ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white" : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border-2 border-emerald-200"}`}
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y }}
      transition={{ duration: 1.5 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedSkills, setClickedSkills] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentTopic = topics[currentTopicIndex];

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
    setQuizIndex(0); // Start quiz from the first question
    setQuizCompleted(false);
    setSelectedOption(null); // Reset option selection
  };

  const handleQuizAnswer = (option) => {
    setSelectedOption(option); // Set the selected option
    if (selectedSkill.quiz[quizIndex].answer === option) {
      setIsCorrect(true); // Mark as correct
    } else {
      setIsCorrect(false); // Mark as incorrect
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < selectedSkill.quiz.length - 1) {
      setQuizIndex(quizIndex + 1);
      setSelectedOption(null); // Reset the selected option for the next question
      setIsCorrect(false); // Reset correctness
    } else {
      setQuizCompleted(true); // Mark the quiz as completed
      setClickedSkills([...clickedSkills, selectedSkill.name]); // Mark skill as completed
      setIsModalOpen(false); // Close modal when quiz finishes
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextTopic = () => {
    setCurrentTopicIndex((prevIndex) => (prevIndex + 1) % topics.length);
  };

  const handlePreviousTopic = () => {
    setCurrentTopicIndex(
      (prevIndex) => (prevIndex - 1 + topics.length) % topics.length
    );
  };

  return (
    <>
      <div className="w-[100%] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 min-h-screen">
        <div className="w-[70%] h-[100%] ">
          <h2 className="font-bold text-8xl w-full text-center md:text-6xl md:mt-2 bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
            {currentTopic.name}
          </h2>
          <div
            className="w-full h-[80%] relative flex items-center justify-center rounded-full bg-circularLight lg:bg-circularLightLg lg:h-[80vh] sm:h-[60vh] xs:h-[50vh]
          md:bg-circularLightMd 
          sm:bg-circularLightSm"
          >
            <motion.div
              className="flex items-center justify-center rounded-full font-semibold bg-gradient-to-br from-emerald-600 to-green-700 text-white p-8 shadow-xl cursor-pointer lg:p-6 md:p-4 xs:text-xs xs:p-2 border-2 border-emerald-300"
              whileHover={{ scale: 1.05 }}
            >
              {currentTopic.name}
            </motion.div>

            {currentTopic.subtopics.map((subtopic, index) => (
              <Skill
                key={index}
                name={subtopic.name}
                x={subtopic.x}
                y={subtopic.y}
                onClick={() => handleSkillClick(subtopic)}
                isClicked={clickedSkills.includes(subtopic.name)}
              />
            ))}

            {/* Modal */}
            {isModalOpen && selectedSkill && (
              <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center backdrop-blur-sm z-50">
                <div className="bg-gradient-to-br from-white to-green-50 p-8 rounded-2xl shadow-2xl max-w-lg w-full relative border-2 border-emerald-200">
                  {/* Quiz Title */}
                  <h2 className="text-2xl font-semibold mb-6 text-center text-emerald-800">
                    {selectedSkill.name} Quiz ✨
                  </h2>

                  {quizCompleted ? (
                    <p className="text-emerald-600 font-bold text-center text-lg">
                      ✓ Quiz completed! This skill is now marked as completed.
                    </p>
                  ) : (
                    <>
                      {/* Question */}
                      <p className="font-medium text-lg mb-4 text-gray-800">
                        {quizIndex + 1}.{" "}
                        {selectedSkill.quiz[quizIndex].question}
                      </p>

                      {/* Options */}
                      <div className="mt-4 space-y-2">
                        {selectedSkill.quiz[quizIndex].options.map(
                          (option, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleQuizAnswer(option)}
                              className={`block py-3 px-4 w-full rounded-xl text-left font-semibold transition-all duration-300 shadow-md hover:shadow-lg
                              ${
                                selectedOption === option &&
                                option === selectedSkill.quiz[quizIndex].answer
                                  ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white transform scale-105" // Correct answer
                                  : selectedOption === option
                                  ? "bg-gradient-to-r from-red-400 to-red-500 text-white transform scale-105" // Wrong answer
                                  : "bg-white text-gray-800 border-2 border-emerald-200 hover:border-emerald-300"
                              }`}
                            >
                              {option}
                            </button>
                          )
                        )}
                      </div>
                    </>
                  )}

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-8">
                    <button
                      className="py-2.5 px-6 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    {!quizCompleted && (
                      <button
                        className={`py-2.5 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md
                      ${
                        selectedOption === null
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 hover:shadow-lg"
                      }
                        `}
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null} // Disable Next button if no option selected
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              className="py-2.5 px-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
              onClick={handlePreviousTopic}
            >
              ← Previous
            </button>
            <button
              className="py-2.5 px-9 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
              onClick={handleNextTopic}
            >
              Next →
            </button>
          </div>{" "}
        </div>
      </div>
    </>
  );
};

export default Skills;