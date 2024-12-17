"use client";

import React, { useState } from "react";

// Import the library
import { EditableMathField, StaticMathField } from "react-mathquill";
import { addStyles } from 'react-mathquill';

// Dynamically adds the necessary styles to the head of your document
addStyles()



// Initial LaTeX equation (e.g., for cosine rule)
const initialLatex = "\\cos\\left(A\\right)=\\frac{b^2+c^2-a^2}{2\\cdot b\\cdot c}";

const EditableMathExample = () => {
  const [latex, setLatex] = useState("");
  const [rawText, setRawText] = useState("");  // For capturing the raw text input

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Editable Math Field</h2>

      {/* Editable Math Field */}
      <div className="mb-6 bg-white text-black">
        <EditableMathField
          className="mathquill-example-field border p-4 rounded-lg w-full"
          latex={latex}
          onChange={(mathField) => {
            const newLatex = mathField.latex();  // Get LaTeX
            setLatex(newLatex);  // Update LaTeX state
            setRawText(mathField.text());  // Set raw text (without LaTeX)
          }}
          mathquillDidMount={(mathField) => {
            setRawText(mathField.text());  // Initialize raw text when math field mounts
          }}
        />
      </div>

      {/* Display Raw LaTeX */}
      <div className="result-container mb-4">
        <span className="font-semibold">Raw LaTeX:</span>
        <span className="text-gray-700">{latex}</span>
      </div>

      {/* Display Raw Text */}
      <div className="result-container mb-4">
        <span className="font-semibold">Raw Text (Human-readable):</span>
        <span className="text-gray-700">{rawText}</span>
      </div>

      {/* Rendered Math Equation (using StaticMathField) */}
      <div className="rendered-math-container mb-6">
        <h3 className="text-xl font-semibold mb-2">Rendered Equation:</h3>
        <div className="math-box p-4 border border-gray-300 rounded-lg bg-gray-50">
          <StaticMathField>
            {latex}
          </StaticMathField>
        </div>
      </div>

      {/* Reset Button */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        onClick={() => {
          setLatex(""); // Reset the LaTeX equation
          setRawText(""); // Reset the raw text
        }}
      >
        Reset Field
      </button>
    </div>
  );
};

export default EditableMathExample;
