"use client";

import { Result } from 'postcss';
import React, { useState } from "react";
import { EditableMathField, StaticMathField } from "react-mathquill";
import { addStyles } from "react-mathquill";
import katex from "katex"; // Import KaTeX for rendering
import "katex/dist/katex.min.css";

// Dynamically adds the necessary styles to the head of your document
addStyles();

export default function Page() {

// !Adding the Formulas-----------------------------------------------------------------------------------------
  const latexSymbols = [
    { symbol: " ∑ ", latex: "\\sum" },
    { symbol: " ∫ ", latex: "\\int" },
    { symbol: " √ ", latex: "\\sqrt{}" },
    { symbol: " frc ", latex: "\\frac{}{}" },
  ];
// ^ Declaring the States----------------------------------------------------------------------------------------
  const [popup, setPopup] = useState(false);
  const [latexInput, setLatexInput] = useState(""); // LaTeX input for math
  const [plainText, setPlainText] = useState(""); // Plain text input
  const [renderedLatex, setRenderedLatex] = useState(""); // Store rendered LaTeX
  // Handle symbol click in the popup
  const handleSymbolClick = (symbol) => {
    setLatexInput((prevLatexInput) => prevLatexInput + symbol); // Append symbol
  };
   // Handle "Submit" from the popup and update the main text field
    const handlePopupSubmit = () => {
    // Render the LaTeX input into HTML (KaTeX renders LaTeX to HTML)
    const renderedMath = katex.renderToString(latexInput, { throwOnError: false });
  // Get the editable div by its ID
    const editableDiv = document.getElementById("add_to_me");

  // Insert the rendered math (HTML) directly into the div
 //! Just I push in one array Box here------------------------------------------------------------------------
    editableDiv.innerHTML = editableDiv.innerHTML + renderedMath;
    let createObj=[];
    createObj.push(editableDiv);
    console.log(createObj)
    const result=createObj.map((e)=>{
      return(
        <div>
          {e}
        </div>
      )
    })
    console.log(result,"im a result");    // let ded=result;
    setLatexInput("");
    // Close the popup
    setPopup(false);
  };
  // Handle LaTeX rendering and insertion into main content area
  const handleSubmit = () => {
    try {
      const renderedMath = katex.renderToString(plainText, { throwOnError: false });
      setRenderedLatex(renderedMath); // Rendered math for display
      // console.log(renderedMath,"rendere")
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
    const editableDiv = document.getElementById("add_to_me");
    const content = editableDiv;//innerHtml
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setPopup((prevPopup) => !prevPopup);
  };
const katexSpan = document.querySelector(".katex");
// Check if katexSpan is found
if (katexSpan) {
    // Fetch the LaTeX code from the MathML annotation 
    const annotationElement = katexSpan.querySelector("annotation[encoding='application/x-tex']");
    const annotationData = annotationElement ? annotationElement.outerHTML : null;

    // Output the annotation tag along with its content
    console.log("Annotation Data:", annotationData);
} else {
    // console.error("Error: Element with class 'katex' not found.");
}
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Main text area for user input */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-xl w-full space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-700">Math Editor</h1>

        <div className="flex flex-col gap-4">
          {/* Editable div */}
          <div
            id="add_to_me"
            className="border-2 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
            contentEditable={true}
            onInput={(e) => setPlainText(e.target.innerText)} // Update plain text
            placeholder="Enter your text or LaTeX here"
          />

          {/* Action buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={handleSubmit} // Handle text submission
              className="bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
            <button
              onClick={togglePopup} // Open popup for math symbols
              className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-green-600 focus:outline-none"
            >
              Equation
            </button>
          </div>
        </div>

        {/* Rendered LaTeX */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold"></h3>
          <div
            className="mt-4 text-white"
            dangerouslySetInnerHTML={{ __html: renderedLatex }} // Render LaTeX as HTML
          />
        </div>
      </div>

      {/* Popup for LaTeX symbol toolbox */}
      {popup && (
        <div>
          <div className="fixed inset-0 bg-black opacity-50 z-40" />

          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
              <h2 className="text-2xl font-semibold mb-6 text-black text-center">
                Toolbox
              </h2>

              {/* LaTeX Symbol Grid */}
              <div className=" pl-64 grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 mb-6 ">
                {latexSymbols.map((item, index) => (
                  <button 
                    key={index}
                    className="flex justify-center items-center p-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-700 bg-green-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out"
                    onClick={() => handleSymbolClick(item.latex)}
                  >
                    {item.symbol}
                  </button>
                ))}
              </div>
            
              {/* MathQuill editor inside the popup */}
              <div className="mb-6">
                <EditableMathField
                  className="mathquill-example-field border p-4 rounded-lg w-full text-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  latex={latexInput}
                  onChange={(mathField) => setLatexInput(mathField.latex())}
                />
              </div>

              {/* Submit and Close buttons */}
              <div className="flex justify-center gap-6">
                <button
                  onClick={handlePopupSubmit}
                  className="bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                <button
                  onClick={togglePopup} // Close popup
                  className="bg-gray-600 text-white py-3 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


