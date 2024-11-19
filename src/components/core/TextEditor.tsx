import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [userText, setUserText] = useState(""); // State to store custom text input
  const quillRef = useRef<Quill | null>(null); // Properly type the quill instance

  useEffect(() => {
    if (editorRef.current) {
      // Initialize Quill editor
      const quill = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["blockquote", "link", "code-block"],
          ],
        },
      });
      quillRef.current = quill; // Save quill instance to ref
    }

    return () => {
      // Proper cleanup of Quill instance when component unmounts
      if (quillRef.current) {
        quillRef.current = null; // Set quill instance reference to null
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserText(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Custom Input Box */}
      <div className="mb-4">
        <input
          type="text"
          value={userText}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md text-gray-700"
          placeholder="Enter text here"
        />
      </div>

      {/* Quill Editor */}
      <div ref={editorRef} className="h-40 border rounded-md"></div>
    </div>
  );
};

export default TextEditor;
