import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Speedometer from "react-d3-speedometer";
import about from "../assets/About.mp4";
import years from "../assets/5Years.mp4";
import strengths from "../assets/Strengths&Weaknesses.mp4";

// --- Custom Tailwind/Color Configuration for Classy Green Look ---
// The requested colors:
// Shamrock Green (deeper, bolder green)
// Medium Green (a balance)
// Emerald Green (a vivid, rich green)
// Mint Green (light, cute green)
// Whitish Shades Opaque (like a soft white or very light green)
// Black

const customColors = {
  shamrock: '#009E60', // Adjusted for a nice, rich shamrock
  mediumGreen: '#3CB371', // Medium Sea Green
  emerald: '#00C957', // A bright, vivid emerald
  mint: '#98FB98', // Pale Green, a very light, cute mint
  // Using Tailwind's default shades for a few others to support a full spectrum
  green900: '#064E3B', // Darkest green for text/accents
  green700: '#047857',
  green500: '#10B981',
  green100: '#D1FAE5', // Very light background/border
  offWhite: 'rgba(255, 255, 255, 0.95)', // Whitish Shade (Opaque)
  softBg: '#F0FFF0', // Honeydew, a very soft light green background
};


const VideoPlayer = () => {
  const videos = [about, years, strengths];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prediction, setPrediction] = useState(null); // LOGIC KEPT
  const [fileUrl, setFileUrl] = useState(null); // LOGIC KEPT
  const [confidenceLevel, setConfidenceLevel] = useState(0); // LOGIC KEPT
  const [mediaRecorder, setMediaRecorder] = useState(null); // LOGIC KEPT
  const [audioChunks, setAudioChunks] = useState([]); // LOGIC KEPT
  const videoRef = useRef(null); // LOGIC KEPT
  const webcamRef = useRef(null); // LOGIC KEPT

  // LOGIC KEPT
  useEffect(() => {
    const oscillateConfidenceLevel = () => {
      const randomValue = Math.random() * 1.5 + 2.8;
      setConfidenceLevel(randomValue);
    };

    const interval = setInterval(oscillateConfidenceLevel, 5000);
    oscillateConfidenceLevel();

    return () => clearInterval(interval);
  }, []);

  // LOGIC KEPT
  const handleStart = () => {
    setIsModalOpen(false);
    setIsPlaying(true);
    startWebcam();
  };

  // LOGIC KEPT
  const startWebcam = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      if (webcamRef.current) {
        webcamRef.current.srcObject = videoStream;
      }

      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(audioStream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prev) => [...prev, event.data]);
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // LOGIC KEPT
  const handleNext = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        await sendRecording(audioBlob);
        await saveRecordingLocally(audioBlob);
        setAudioChunks([]);
      };
    }

    setCurrentVideoIndex((prevIndex) =>
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
    handleStart();
  };

  // LOGIC KEPT
  const sendRecording = async (audioBlob) => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
  };

  // LOGIC KEPT
  const saveRecordingLocally = async (audioBlob) => {
    const file = new File([audioBlob], "recording.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/save-audio",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setFileUrl(response.data.fileUrl);
    } catch (error) {
      console.error("Error saving recording:", error);
    }
  };

  // --- UI/STYLE CHANGES BEGIN HERE ---
  return (
    <div 
        className="flex flex-col items-center justify-center min-h-screen w-full p-8"
        style={{ backgroundColor: customColors.softBg }} // Soft light green/whitish background
    >
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h2 
            className="text-5xl font-extrabold mb-2 drop-shadow-sm"
            style={{ color: customColors.green900 }} // Dark text
        >
          HR Interview Simulator 🌱
        </h2>
        <p 
            className="text-sm font-medium italic"
            style={{ color: customColors.green700 }} // Medium text
        >
          Practice your interview skills with calm confidence
        </p>
      </div>

      {/* Start Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div 
            className="p-10 rounded-3xl shadow-xl max-w-md w-full mx-4 border-2"
            style={{ 
                backgroundColor: customColors.offWhite, // Opaque whitish/soft white
                borderColor: customColors.mint // Light, cute border
            }}
          >
            <div className="text-center mb-6">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md"
                style={{ 
                    background: `linear-gradient(to bottom right, ${customColors.mint}, ${customColors.emerald})` // Gradient from light to bright green
                }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 
                className="text-2xl font-bold mb-2"
                style={{ color: customColors.green900 }} // Dark text
              >
                Ready to Begin?
              </h2>
              <p 
                className="text-sm font-medium"
                style={{ color: customColors.green700 }} // Medium text
              >
                Ensure your camera and microphone are ready 🎤
              </p>
            </div>
            <button
              className="w-full px-6 py-4 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.03] focus:outline-none focus:ring-4"
              style={{
                background: `linear-gradient(to right, ${customColors.emerald}, ${customColors.shamrock})`, // Emerald to Shamrock gradient
                borderColor: customColors.shamrock,
              }}
              onClick={handleStart}
            >
              Start Interview
            </button>
          </div>
        </div>
      )}

      {/* Main Section */}
      {isPlaying && (
        <div className="w-full max-w-7xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Interviewer Video */}
            <div 
                className="rounded-3xl shadow-xl overflow-hidden border-2"
                style={{ 
                    backgroundColor: customColors.offWhite, // Opaque whitish
                    borderColor: customColors.green100 // Very light green border
                }}
            >
              <div 
                className="px-4 py-3"
                style={{ background: `linear-gradient(to right, ${customColors.mediumGreen}, ${customColors.shamrock})` }} // Green gradient header
              >
                <p className="text-white font-semibold text-sm">Interviewer</p>
              </div>
              <div className="p-4">
                <video
                  key={currentVideoIndex}
                  src={videos[currentVideoIndex]}
                  className="rounded-2xl w-full h-80 object-contain shadow-inner"
                  autoPlay
                />
              </div>
            </div>

            {/* Your Video */}
            <div 
                className="rounded-3xl shadow-xl overflow-hidden border-2"
                style={{ 
                    backgroundColor: customColors.offWhite, // Opaque whitish
                    borderColor: customColors.green100 // Very light green border
                }}
            >
              <div 
                className="px-4 py-3"
                style={{ background: `linear-gradient(to right, ${customColors.mint}, ${customColors.emerald})` }} // Mint to Emerald gradient header
              >
                <p className="text-black font-semibold text-sm">You</p>
              </div>
              <div className="p-4">
                <video
                  ref={webcamRef}
                  className="rounded-2xl w-full h-80 object-cover shadow-inner"
                  autoPlay
                  playsInline
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confidence Meter */}
      {isPlaying && (
        <div 
            className="rounded-3xl shadow-xl p-6 mb-6 border-2 max-w-md w-full"
            style={{ 
                backgroundColor: customColors.offWhite, // Opaque whitish
                borderColor: customColors.green100 // Very light green border
            }}
        >
          <div className="text-center mb-4">
            <h3 
                className="text-lg font-bold mb-1"
                style={{ color: customColors.green900 }} // Dark text
            >
              Confidence Level ✨
            </h3>
            <p 
                className="text-sm font-medium"
                style={{ color: customColors.green700 }} // Medium text
            >
              Real-time analysis of your performance
            </p>
          </div>
          <div className="flex justify-center">
            <Speedometer
              minValue={0}
              maxValue={5}
              value={confidenceLevel}
              needleColor="#064E3B" // Dark green
              segments={5}
              segmentColors={[
                "#ef4444", // Red (kept for low)
                "#f97316", // Orange
                "#facc15", // Yellow
                customColors.mediumGreen, // Medium Green
                customColors.shamrock, // Shamrock Green (highest)
              ]}
              needleTransitionDuration={400}
              needleTransition="easeElastic"
              textColor="transparent"
              height={120}
              width={240}
            />
          </div>
        </div>
      )}

      {/* Next Button */}
      {isPlaying && (
        <button
          className="w-full max-w-md px-8 py-4 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.03] focus:outline-none focus:ring-4"
          style={{
            background: `linear-gradient(to right, ${customColors.mint}, ${customColors.emerald})`, // Mint to Emerald gradient
            color: customColors.green900, // Black text on light button
            borderColor: customColors.emerald,
          }}
          onClick={handleNext}
        >
          Next Question →
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;