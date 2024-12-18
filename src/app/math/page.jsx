"use client";

import React, { useState } from "react";
import { EditableMathField } from "react-mathquill";
import { addStyles } from "react-mathquill";
import katex from "katex";
import "katex/dist/katex.min.css"; // Ensure KaTeX CSS is included

addStyles();

export default function EditableMath() {
  const [latex, setLatex] = useState(""); // State to store LaTeX input
  const [renderedEquation, setRenderedEquation] = useState(""); // State to store the rendered equation
  const [popup, setPopup] = useState(false); // State to toggle popup visibility

  // Handle the change in the EditableMathField
  const handleMathChange = (mathField) => {
    const updatedLatex = mathField.latex(); // Get the LaTeX string
    setLatex(updatedLatex); // Update the state with the LaTeX string

    // Render LaTeX using KaTeX for live preview
    const renderedMath = katex.renderToString(updatedLatex, {
      throwOnError: false,
    });
    setRenderedEquation(renderedMath); // Store the rendered HTML equation
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setPopup((prevPopup) => !prevPopup);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h3 className="text-2xl font-bold text-center mb-6">Editable Math Equation Input</h3>

      {/* Editable Math Field without popup */}
      <div className="mb-6">
        <label htmlFor="mathInput" className="block text-lg font-semibold text-gray-700">
          Enter Math Equation (No Popup)
        </label>
        <EditableMathField
          id="mathInput"
          latex={latex} // Bind LaTeX state to EditableMathField
          onChange={handleMathChange} // Handle changes to LaTeX input
          className="border p-4 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display the rendered equation */}
      <h4 className="text-xl font-semibold text-gray-800">Rendered Math Equation:</h4>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: renderedEquation }} // Render the LaTeX as HTML
      />

      {/* Button to trigger popup */}
      <button
        onClick={togglePopup}
        className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-6 transition-all duration-300 ease-in-out"
      >
        <span className="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path d="M12 4v16m8-8H4" />
          </svg>
          Add Math Equation with Popup
        </span>
      </button>

      {/* Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black opacity-50 z-40">
          {/* Modal Content */}
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full sm:max-w-lg">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
                Enter Math Equation in Popup
              </h2>

              {/* EditableMathField inside popup */}
              <div className="mb-6">
                <EditableMathField
                  latex={latex} // Bind LaTeX state to EditableMathField
                  onChange={handleMathChange} // Handle changes to LaTeX input
                  className="border p-4 rounded-lg w-full text-black focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Buttons to submit or close the popup */}
              <div className="flex justify-between">
                <button
                  onClick={togglePopup} // Close popup without saving
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPopup(false); // Close the popup
                    setRenderedEquation(katex.renderToString(latex)); // Render LaTeX and close popup
                  }}
                  className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
