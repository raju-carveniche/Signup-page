'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import katex from 'katex'; // Import KaTeX for rendering math
import 'katex/dist/katex.min.css'; // Import KaTeX styles

const MathEditorPopup = dynamic(() => import('@/app/component/home'), { ssr: false });

const Home = () => {
  const [content, setContent] = useState('');
  const [isMathEditorOpen, setMathEditorOpen] = useState(false);
  const contentRef = useRef(null);

  const handleInsertEquation = (equation) => {
    const renderedEquation = katex.renderToString(equation, {
      throwOnError: false,
    });
  
    // Create a span element for the equation
    const span = document.createElement('span');
    span.className = 'mq-selectable';
    span.setAttribute('data-latex', equation);
    span.setAttribute('contenteditable', 'false'); // Make the equation non-editable
    span.innerHTML = renderedEquation;
  
    // Append the equation span to the contentEditable div
    if (contentRef.current) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
  
        // Insert the span at the current cursor position
        range.deleteContents();
        range.insertNode(span);
  
        // Create a space after the equation so the cursor moves outside
        const space = document.createTextNode(' ');
        range.insertNode(space);
  
        // Move the cursor after the newly inserted span
        range.setStartAfter(space);
        range.setEndAfter(space);
        selection.removeAllRanges();
        selection.addRange(range);
  
        // Update the content state
        setContent(contentRef.current.innerHTML);
      } else {
        // No selection, handle if needed (e.g., insert at the end of the content)
        const div = contentRef.current;
        div.appendChild(span);
        div.appendChild(document.createTextNode(' ')); // Optional: Add space after equation
      }
  
      setMathEditorOpen(false);
    }
  };
  

  // Handle form submission
  const handleSubmit = () => {
    // Extract original LaTeX from spans
    const div = document.createElement('div');
    div.innerHTML = content;
    const equations = div.querySelectorAll('.mq-selectable');
    equations.forEach((span) => {
      const latex = span.getAttribute('data-latex');
      span.innerHTML = latex; // Replace with original LaTeX
    });

    console.log('Final Content:', div.innerHTML); // This is the submitted content
  };

  // Track changes in the contentEditable field
  const handleContentChange = () => {
    if (contentRef.current) {
      setContent(contentRef.current.innerHTML);
    }
  };

  // Automatically update the content in the div when the content state changes
  useEffect(() => {
    if (contentRef.current && content !== contentRef.current.innerHTML) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="p-6 bg-gray-800 rounded shadow-md border border-white w-full max-w-[600px] sm:w-[500px] md:w-[400px] lg:w-[400px] xl:w-[400px] mt-10">
        <div className="flex flex-col gap-4 mb-4">
          <button
            className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            onClick={() => setMathEditorOpen(true)}
          >
           Math Editor
          </button>

          <div
            ref={contentRef}
            className="border border-gray-300 p-4 bg-white rounded text-black w-full mb-4"
            contentEditable
            onInput={handleContentChange}
            style={{ minHeight: '80px', fontSize: '16px', lineHeight: '1.5', cursor: 'text' }}
          />

          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Submit
          </button>
        </div>

        {/* Math Editor Popup */}
        {isMathEditorOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div>
              <MathEditorPopup
                onInsertEquation={handleInsertEquation}
                onClose={() => setMathEditorOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
