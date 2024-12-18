"use client";

import React, { useState, useEffect } from "react";
import { EditableMathField } from "react-mathquill";
import { addStyles } from "react-mathquill";
import katex from "katex"; // Import KaTeX for rendering
import "katex/dist/katex.min.css";

// Dynamically adds the necessary styles to the head of your document
addStyles();

export default function Math() {
  const latexSymbols = [
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

  const [popup, setPopup] = useState(false);
  const [latexy, setLatexy] = useState(""); // LaTeX in the popup input
  const [latex, setLatex] = useState(""); // LaTeX in the main input
  const [data, setData] = useState(""); // Data state for any text input (if necessary)
  const [jsonData, setJsonData] = useState({}); // JSON data state to store LaTeX and rendered HTML
  const [renderedEquation, setRenderedEquation] = useState(""); // Store rendered equation

  // To ensure the latex input doesn't reset when the popup toggles
  useEffect(() => {
    // Optionally, you can add logic here if needed when the popup opens
  }, [popup]);

//   var a=[];
  // Handle the changes in the main LaTeX field
  const handleMathChange = (mathField) => {
    const updatedLatex = mathField.latex(); // Get the LaTeX string
    setLatex(updatedLatex); // Update the LaTeX state with the new value
    setData(updatedLatex); // Ensure the data state also gets updated

    // Render LaTeX using KaTeX for live preview
    const renderedMath = katex.renderToString(updatedLatex, {
      throwOnError: false,
    });
    // a.push(mathField.el());
    setRenderedEquation(renderedMath); // Store the rendered HTML equation
  };

  // Handle symbol click in the popup
  const handleSymbolClick = (symbol) => {
    setLatexy((prevLatexy) => prevLatexy + symbol); // Append the symbol to the existing LaTeX string in the popup
  };

  // Handle "Submit" from the popup and update the main math input
  const handlePopupSubmit = () => {
    setData((prevData) => prevData + latexy); // Append popup LaTeX to the main input
    setLatex(data + latexy); // Update latex state as well
    
    setLatexy("")

    setPopup(false); // Close the popup after submitting

    console.log("Updated data:", data + latexy); // Log the updated data
  };

  const submithandler = () => {
    const katexHtml = `<span class="katex">${data}</span>`; // Wrap LaTeX in <span class="katex">
    console.log(katexHtml);
    // console.log(a)

    // Render the LaTeX as a math expression using KaTeX
    try {
      const renderedMath = katex.renderToString(latex, {
        throwOnError: false,
      });
      setRenderedEquation(renderedMath); // Store rendered math HTML
      const data = {
        latex: latex,           // Store LaTeX string
        katexHtml: renderedMath, // Store rendered HTML from KaTeX
        timestamp: new Date().toISOString(), // Optional timestamp for tracking
      };

      // Set the JSON data state
      setJsonData(data);
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
  };




  // Toggle popup visibility
  const togglePopup = () => {
    setPopup((prevPopup) => !prevPopup);
  };

  return (
    <div className="relative">
      {/* Input area */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <EditableMathField
          className="mathquill-example-field border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          latex={latex}
          onChange={handleMathChange}
        />
        <div>
            
        </div>
        <button
          onClick={submithandler} // Log the data when Submit button is clicked
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
        <button
          onClick={togglePopup}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Insert Equation
        </button>
      </div>

      {/* Popup Modal */}
      {popup && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-40" />

          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
              <h2 className="text-2xl font-semibold mb-4 text-black text-center">
                LaTeX Symbol Toolbox
              </h2>
              <div className="toolbox mb-6">
                <div className="grid grid-cols-4 gap-4">
                  {latexSymbols.map((item, index) => (
                    <button
                      key={index}
                      className="p-2 border rounded-lg hover:bg-gray-100 text-black focus:outline-none"
                      onClick={() => handleSymbolClick(item.latex)}
                    >
                      {item.symbol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6 bg-white text-black flex">
                <EditableMathField
                  className="mathquill-example-field border p-4 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  latex={latexy}
                  onChange={(mathField) => setLatexy(mathField.latex())}
                />
              </div>

              <div className="mathquill-example flex justify-center gap-4">
                <button
                  onClick={handlePopupSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
                <button
                  onClick={togglePopup}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rendered Equation Display */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Rendered Math Equation:</h3>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: renderedEquation }} // Render the LaTeX as HTML
        />
      </div>
    </div>
  );
}
