import React, {  forwardRef } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface QuillEditorProps {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  quillRef: React.RefObject<any>; 
}

const QuillEditor = forwardRef((props: QuillEditorProps, ref: React.Ref<any>) => {
  const { value, setValue, quillRef } = props;
  const toolbarOptions = [
    ['bold', 'italic'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['blockquote', 'code-block'],
    ['link'],
  ];

  const handleEditorChange = (content: string) => {
    const plainText = content.replace(/<[^>]+>/g, '').trim();
    setValue(plainText);
    setValue(content);
  };

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleEditorChange}
      modules={modules}
      className="postEditorText"
      ref={quillRef} 
    />
  );
});

QuillEditor.displayName = 'QuillEditor';

export default QuillEditor;
