"use client";

import React, { useState } from "react";
import { EditableMathField } from "react-mathquill";
import { addStyles } from "react-mathquill";
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

  // Handle symbol click in the popup
  const handleSymbolClick = (symbol) => {
    setLatexInput((prevLatexInput) => prevLatexInput + symbol); // Append symbol
    // console.log(`Symbol clicked: ${symbol}`); // Log the clicked symbol
  };

  // Handle "Submit" from the popup and update the main text field
  const handlePopupSubmit = () => {
    // console.log("Latex input from popup:", latexInput);
    // console.log("Plain text value:", plainText);
    // console.log("Length of plain text:", plainText.length);

    const renderedMath = katex.renderToString(latexInput,
      
      { throwOnError: false });

    // console.log("------- ", renderedMath);
    // console.log("Rendered LaTeX:", renderedMath); // Log the rendered LaTeX

    // Get the editable div by its ID
    const editableDiv = document.getElementById("add_to_me");

    // Check if the div is found
    if (editableDiv) {
      // Insert the rendered math (HTML) directly into the div
      editableDiv.innerHTML = editableDiv.innerHTML + renderedMath;
      console.log("Editable div content after insertion:", editableDiv.innerHTML);

      console.log(editableDiv);//-----------------------------------------------------------

      const katexSpan = document.querySelector(".katex");
      // Check if katexSpan is found
      if (katexSpan) {
        // Fetch the LaTeX code from the MathML annotation
        const annotationElement = katexSpan.querySelector("annotation[encoding='application/x-tex']");
        const annotationData = annotationElement ? annotationElement.outerHTML : null;

        // Output the annotation tag along with its content
        // console.log("Annotation Data:", annotationData);
      }
    } else {
      console.error("Editable div not found!");
    }

    // Clear the LaTeX input field
    setLatexInput("");

    // Close the popup
    setPopup(false);
  };

  // Function to extract LaTeX from rendered HTML
  const extractLatexFromRenderedMath = () => {
    const renderedMath = document.getElementById("add_to_me")?.innerHTML;

    if (!renderedMath) {
      console.error("No content in 'add_to_me' div.");
      return '';
    }

    // Create a temporary container to parse the HTML content
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = renderedMath;

    // Find all annotation tags which contain raw LaTeX
    const latexAnnotations = tempContainer.querySelectorAll('annotation[encoding="application/x-tex"]');

    if (latexAnnotations.length > 0) {
      // Extract the raw LaTeX from the annotation tag
      const rawLatex = latexAnnotations[0].textContent;
      console.log("Extracted Raw LaTeX:", rawLatex);
      return rawLatex;
    } else {
      console.error("No raw LaTeX found.");
      return '';
    }
  };

  // Handle LaTeX rendering and insertion into main content area
  const handleSubmit = () => {
    try {
      const renderedMath = katex.renderToString(plainText, {
        output: "mathml",
        throwOnError: false
      });
      setRenderedLatex(renderedMath); // Rendered math for display
      console.log("MathML Output:", renderedMath); // Log MathML
      console.log("Plain text length:", plainText.length); // Log the length of the plain text
    } catch (error) {
      console.error("Error rendering LaTeX:", error);
    }

    const editableDiv = document.getElementById("add_to_me");
    const content = editableDiv ? editableDiv.innerHTML : '';

    // Log the content to the console
    console.log("Content in the editable div:", content);

    // You can also extract the raw LaTeX from the rendered math here
    const extractedLatex = extractLatexFromRenderedMath();
    console.log("Extracted LaTeX from rendered math:", extractedLatex);
  };

  // Toggle popup visibility
  const togglePopup = () => {
    setPopup((prevPopup) => !prevPopup);
  };

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
      <div
        className="rendered-math mt-6"
        // dangerouslySetInnerHTML={{ __html: renderedLatex }} // Render the LaTeX
      />
    </div>
  );
}
