import React, { useState, useEffect, useRef } from "react";
import "quill/dist/quill.snow.css"; // Import Quill CSS directly

const TextEditor = ({ togglePopup }: any) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [userText, setUserText] = useState(""); // State to store custom text input
  const quillRef = useRef<any>(null); // Type Quill reference as 'any'

  useEffect(() => {
    // Dynamically import Quill only on the client-side
    const loadQuill = async () => {
      if (typeof window !== "undefined" && editorRef.current) {
        const Quill = (await import("quill")).default; // Import Quill dynamically in useEffect
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
        quillRef.current = quill; // Save Quill instance to ref
      }
    };

    loadQuill(); // Load Quill when component mounts

    return () => {
      // Proper cleanup of Quill instance when component unmounts
      if (quillRef.current) {
        quillRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

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
