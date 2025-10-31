import React from "react";
import CodeEditor from "./CodeEditor/CodeEditor";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

// --- Consistent Color Palette for the Website Theme ---
const customColors = {
  // Main Background: Soft, light, and consistent (similar to the VideoPlayer body)
  softBg: '#F0FFF0', // Honeydew (Whitish Shade Opaque)
  
  // Panel/Card Background: Opaque white for clarity and separation
  offWhite: 'rgba(255, 255, 255, 0.95)',
  
  // Accent Greens
  shamrock: '#009E60', // Deep, Bolder Accent
  emerald: '#00C957', // Vivid, Rich Accent
  mint: '#98FB98',    // Light, Cute Accent/Border
  
  // Text/Dark Elements
  green900: '#064E3B', // Darkest green for text/accents
};

const CodingPlatform = () => {
  return (
    <>
      <div 
        className="h-[100vh] w-[100%]"
        // Using the same soft, light background as the main body of the first component
        style={{ backgroundColor: customColors.softBg }} 
      >
        <div className="flex h-[100%]"> {/* Changed h-[90%] to h-[100%] to fill the height */}
          
          {/* Sidebar Area: Styled as a clean, slightly separated panel */}
          <div 
            className="p-8 flex flex-col h-full"
            style={{ 
                backgroundColor: customColors.offWhite, 
                borderRight: `2px solid ${customColors.mint}`, // Light, cute divider
                width: '300px', // Assuming a fixed width for the sidebar
                boxShadow: '2px 0 5px rgba(0, 0, 0, 0.05)' // Subtle shadow for depth
            }}
          >
            {/* Placeholder for Sidebar content */}
            <h3 
              style={{ color: customColors.green900, fontWeight: 'bold', borderBottom: `2px solid ${customColors.mint}`, paddingBottom: '10px' }}
            >
              Problem Description
            </h3>
            {/* <Sidebar /> */}
          </div>

          {/* Code Editor Area: Main workspace */}
          <div className="flex-grow p-5 h-full"> {/* Used flex-grow to take remaining width */}
            
            {/* The CodeEditor component is rendered here. 
                Wrapping it in a box/card-like style for better UI. */}
            <div 
              className="w-full h-full rounded-2xl shadow-xl overflow-hidden"
              style={{ 
                backgroundColor: customColors.offWhite, 
                border: `2px solid ${customColors.mint}` // Clean border
              }}
            >
                <CodeEditor />
            </div>

            {/* The original commented out Box structure: */}
            {/* <Box
              minH="100%"
              minW="100%"
              bg="white" // This would now be customColors.offWhite
              color="gray.500" // This would now be customColors.green900
              px={6}
              py={8}
            >
              <CodeEditor />
            </Box> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodingPlatform;