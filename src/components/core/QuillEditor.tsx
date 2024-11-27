"use client";
import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = () => {
  const [value, setValue] = useState('');

  const toolbarOptions = [
    ['bold', 'italic'], 
    [{ list: 'ordered' }, { list: 'bullet' }], 
    ['blockquote', 'code-block'],
    ['link'],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  );
};

export default QuillEditor;