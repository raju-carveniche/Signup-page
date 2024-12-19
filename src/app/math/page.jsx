"use client";

import React, { useEffect, useState } from "react";
import { EditableMathField } from "react-mathquill";
import { addStyles } from "react-mathquill";
import { MathJaxProvider, MathJaxHtml } from 'mathjax3-react';
import katex from "katex"; // Import KaTeX for rendering
import "katex/dist/katex.min.css";

// Dynamically adds the necessary styles to the head of your document
addStyles();

export default function MathEditor() {
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
  const [latexInput, setLatexInput] = useState(""); // LaTeX input for math
  const [plainText, setPlainText] = useState(""); // Plain text input
  const [renderedLatex, setRenderedLatex] = useState(""); // Store rendered LaTeX


  let html=[];

  const handleSymbolClick = (symbol) => {
    setLatexInput((prevLatexInput) => prevLatexInput + symbol); // Append symbol
  };

 
  const handlePopupSubmit = () => {
    html.push(`<span>${latexInput}</span>`);
    const renderedMath = katex.renderToString(latexInput, { throwOnError: false });
    const rendered = katex.renderToString(latexInput, { 
      output:"html",
      throwOnError: false });

    console.log("this is html of Math Equition : - ", rendered );
   
    const editableDiv = document.getElementById("add_to_me");
    if (editableDiv) {
     
      editableDiv.innerHTML = editableDiv.innerHTML + renderedMath;
      console.log("Rendered LaTeX inserted:", renderedMath);
    } else {
      console.error("Editable div not found!");
    }
    setLatexInput("");

    setPopup(false);
  };

 
   

  const handleSubmit = () => {
    try {
      const renderedMath = katex.renderToString(plainText, { 
        output:"htmlAndMathml",
        throwOnError: false });
        // console.log("this is render data have anice things ",renderedMath)
      setRenderedLatex(renderedMath); // Rendered math for display
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }
    console.log()

    const editableDiv = document.getElementById("add_to_me");
    const content = editableDiv ? editableDiv.innerHTML : '';

    // Log the content to the console
    console.log("Content in the div:", content);  
    // console.log("this is final data : ----- ", plainText+ renderedMath);

    // You can also extract the raw LaTeX from the rendered math here
    // const extractedLatex = extractLatexFromRenderedMath();
    // console.log("Extracted LaTeX from rendered math:", extractedLatex);
  };


  const togglePopup = () => {
    setPopup((prevPopup) => !prevPopup);
  };

  useEffect(()=>{
    console.log(html);
  })




  return (
    <div className="relative">
      {/* Main text area for user input */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div
          id="add_to_me"
          className="border p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          contentEditable={true} // Make this div editable
          onInput={(e) => setPlainText(e.target.innerText)} // Update plain text
          placeholder="Enter your text or LaTeX here" // Placeholder text
        />
        <button
          onClick={handleSubmit} // Handle text submission
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit
        </button>
        <button
          onClick={togglePopup} // Open popup for math symbols
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Insert Math Equation
        </button>
      </div>

      {/* Popup for LaTeX symbol toolbox */}
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

              {/* MathQuill editor inside the popup */}
              <div className="mb-6 bg-white text-black flex">
                <EditableMathField
                  className="mathquill-example-field border p-4 rounded-lg w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                  latex={latexInput}
                  onChange={(mathField) => setLatexInput(mathField.latex())}
                />
              </div>

              {/* Submit and Close buttons for popup */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={handlePopupSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  Submit
                </button>
                <button
                  onClick={togglePopup} // Close popup
                  className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rendered LaTeX in the content area */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Rendered LaTeX:</h3>
        <div
          className="mt-4"
          dangerouslySetInnerHTML={{ __html: renderedLatex }} // Render LaTeX as HTML
        />

        <div>
          <MathJaxProvider>
          <MathJaxHtml html={html}/>
          </MathJaxProvider>
        </div>
      </div>
    </div>
  );
}
