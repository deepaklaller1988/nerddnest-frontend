import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const QuillEditor = () => {
  const [editorValue, setEditorValue] = useState('');
  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'align', 'link', 'image'
  ];
  const handleEditorChange = (value: string) => {
    setEditorValue(value); 
  };

  return (
    <div>
      <h2>React Quill Editor</h2>
      <ReactQuill
        value={editorValue}
        onChange={handleEditorChange}
        theme="snow" 
        formats={formats}
      />
      <div className="mt-4">
        <h4>Output:</h4>
        <div>{editorValue}</div>
      </div>
    </div>
  );
};

export default QuillEditor;
