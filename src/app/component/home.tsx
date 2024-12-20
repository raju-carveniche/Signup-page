
'use client';

import React, { useState } from 'react';
import { addStyles, EditableMathField } from 'react-mathquill';

addStyles(); // Required for MathQuill

const MathEditorPopup = ({ onInsertEquation, onClose }) => {
  const [mathValue, setMathValue] = useState('');

  // Predefined equations with both LaTeX expressions and button names
  const predefinedEquations = [
    { symbol: " + ", latex: "+" },
    { symbol: " - ", latex: "-" },
    { symbol: " × ", latex: "\\times" },
    { symbol: " ÷ ", latex: "\\div" },
    { symbol: " = ", latex: "=" },
    { symbol: " ≠ ", latex: "\\neq" },
    { symbol: " ≈ ", latex: "\\approx" },
    { symbol: " α ", latex: "\\alpha" },
    { symbol: " β ", latex: "\\beta" },
    { symbol: " ∑ ", latex: "\\sum" },
    { symbol: " ∫ ", latex: "\\int" },
    { symbol: " √ ", latex: "\\sqrt{}" },
    { symbol: " π ", latex: "\\pi" },
    { symbol: " ∞ ", latex: "\\infty" },
    { symbol: " frac ", latex: "\\frac{}{}" },
  ];

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 p-3 rounded-lg shadow-lg w-full max-w-[300px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[450px] z-50">
      <h2 className="text-xl font-semibold mb-3 text-white">Math Editor</h2>

      {/* Editable Math Field */}
      <div className="border text-white border-gray-100 rounded p-2 mb-3">
        <EditableMathField
          latex={mathValue}
          onChange={(mathField) => setMathValue(mathField.latex())}
        />
      </div>

      {/* Predefined Equations */}
      <div className="flex text-white flex-wrap gap-2 mb-3">
        {predefinedEquations.map((eq, index) => (
          <button
            key={index}
            onClick={() => setMathValue(eq.latex)} // Update the math field with the selected equation
            className="px-3 py-1 bg-blue-600 text-white border border-blue-700 rounded hover:bg-blue-700 transition"
          >
            {eq.symbol} {/* Display the button name */}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-around gap-2">
        <button
          onClick={() => onInsertEquation(mathValue)}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MathEditorPopup;
