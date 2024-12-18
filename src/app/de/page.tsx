"use client";

import React, { useState } from "react";
import { EditableMathField,StaticMathField } from "react-mathquill";
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
  const [latex, setLatex] = useState(""); // LaTeX state
  const [data, setData] = useState(""); // Input data state
  const [jsonData, setJsonData] = useState({});
  const [renderedEquation, setRenderedEquation] = useState(""); // Store rendered equation

  const datahandlerclick = (event) => {
    setData(event.target.value); // Handle text input change
    // console.log(event.target.value);
  };

  const submithandlerdisplay = () => {
    const mathField = document.querySelector('.mathquill-example');  // Get the MathField
    const renderedHtml = mathField ? mathField.innerHTML : ''; // Get the rendered HTML from MathQuill
    const katexHtml = `<span class="mq-selectable">${data}</span>`; // Wrap it in <span class="katex">
    console.log(katexHtml);

    console.log("This is final data : ", data);
  };

  const submithandler = () => {

    const mathField = document.querySelector('.mathquill-example-field');  // Get the MathField
    const renderedHtml = mathField ? mathField.innerHTML : ''; // Get the rendered HTML from MathQuill
    const katexHtml = `<span class="katex">${renderedHtml}</span>`; // Wrap it in <span class="katex">
    console.log(katexHtml);
    // Render the LaTeX as a math expression using KaTeX
    try {
      const renderedMath = katex.renderToString(latex, {
        // throwOnError: false, // Prevent errors from breaking the app
      });
      setRenderedEquation(renderedMath); // Store rendered math HTML
      const data = {
        latex: latex,           // Store LaTeX string
        katexHtml: renderedHtml, // Store rendered HTML from KaTeX
        timestamp: new Date().toISOString(), // Optional timestamp for tracking
      };

      // Set the JSON data state
      setJsonData(data);
    //   console.log("JSON Data:", data); 
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }

    // Update the main data state with the LaTeX content
    setData((prevData) => prevData + latex);
    console.log("Submitted LaTeX:", latex); // Log LaTeX

    // Reset popup visibility and the LaTeX field after submission
    setPopup(false);
    setLatex("");
  };

  const handleSymbolClick = (symbol) => {
    setLatex((prevLatex) => prevLatex + symbol); // Append the symbol to the existing LaTeX string
  };

  const HandleQuestion = () => {
    setPopup((prevPopup) => !prevPopup); // Toggle popup visibility
  };

  return (
    <div className="relative">
      {/* Input area */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={data}
          onChange={datahandlerclick}
          className="border p-2 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your math question or text here"
        />
        
        <button
          onClick={submithandlerdisplay}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
        <button
          onClick={HandleQuestion}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Insert Equation
        </button>
      </div>

      {/* Popup Modal */}
      {popup && (
        <>
          {/* Overlay background */}
          <div className="fixed inset-0 bg-black opacity-50 z-40" />

          {/* Modal content */}
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
                  latex={latex}
                  onChange={(mathField) => {
                    setLatex(mathField.latex());
                    // console.log("Updated LaTeX:", mathField.latex());
                  }}
                />
              </div>

              <div className=" mathquill-example flex justify-center gap-4">
                <button
                  onClick={submithandler}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
                <button
                  onClick={HandleQuestion}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Display the rendered math equation */} 
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
