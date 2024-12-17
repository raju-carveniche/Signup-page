"use client";

import React, { useState } from "react";
import { EditableMathField, StaticMathField } from "react-mathquill";
import { addStyles } from 'react-mathquill';

// Dynamically adds the necessary styles to the head of your document
addStyles();

// List of LaTeX symbols and their corresponding LaTeX code
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
    { symbol: " √ ", latex: "\\sqrt{}" },  // Square root symbol
    { symbol: " π ", latex: "\\pi" },
    { symbol: " ∞ ", latex: "\\infty" },
    { symbol: " frac ", latex: "\\frac{}{}" }, // Fraction placeholder
];

const ToolboxMathEditor = () => {
    const [latex, setLatex] = useState("");  // State for LaTeX input
    const [data, setData] = useState("");    // State for normal text input

    // Function to handle symbol click
    const handleSymbolClick = (symbol) => {
        setLatex(prevLatex => prevLatex + symbol); // Append clicked symbol to the existing LaTeX
    };

    // Handler for the normal input
    const datahandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(event.target.value); // Update data state with user input
    };
    const submithandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => prevData + " " + latex);
        setLatex("")

    }

    // Use Effect or console log to show both data and LaTeX
    React.useEffect(() => {
        console.log("Text Data:", data);
        console.log("LaTeX Equation:", latex);
    }, [data, latex]); // Log whenever `data` or `latex` changes

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">LaTeX Symbol Toolbox</h2>

            {/* LaTeX Symbol Toolbox */}
            <div className="toolbox mb-6">
                <div className="grid grid-cols-4 gap-4">
                    {latexSymbols.map((item, index) => (
                        <button
                            key={index}
                            className="p-2 border rounded-lg hover:bg-gray-100 focus:outline-none"
                            onClick={() => handleSymbolClick(item.latex)}
                        >
                            {item.symbol}
                        </button>
                    ))}
                </div>
            </div>

            {/* Editable Math Field */}
            <div className="mb-6 bg-white text-black flex "  >
                <EditableMathField
                    className="mathquill-example-field border p-4 rounded-lg w-full text-black"
                    latex={latex}
                    onChange={(mathField) => {
                        setLatex(mathField.latex()); // Update LaTeX state when the field changes
                    }}
                />
                {/* <button onClick={submithandler} className="bg-blue-50">submit</button> */}
                <button
                    onClick={submithandler}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Submit
                </button>
            </div>

            {/* Display LaTeX */}
            <div className="result-container mb-4">
                <span className="font-semibold">LaTeX Code:</span>
                <span className="text-white">{latex}</span>
            </div>

            {/* Rendered Math Equation */}
             <div className="rendered-math-container mb-6">
        <h3 className="text-xl font-semibold mb-2">Rendered Equation:</h3>
        <div className="math-box p-4 border text-black border-gray-300 rounded-lg bg-gray-50">
          <StaticMathField>{latex}</StaticMathField>
        </div>
      </div> 

            {/* Normal Text Input */}
            <div className="mb-6">
                <textarea
                    type="text"
                    // value={latex} 
                    value={data}
                    onChange={datahandler}
                    className="border p-2 rounded-lg w-full text-black"
                    placeholder="Enter your math question or text here"
                
                />
                <StaticMathField>{latex}</StaticMathField>
            </div>
        </div>
    );
};

export default ToolboxMathEditor;
