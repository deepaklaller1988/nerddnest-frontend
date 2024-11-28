"use client";
import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface QuillEditorProps {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, setValue }) => {
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
