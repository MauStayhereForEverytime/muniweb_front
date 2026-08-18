// QuillEditor.jsx
import React from 'react';
import ReactQuill from 'react-quill';  // Importa ReactQuill
import 'react-quill/dist/quill.snow.css';  // Estilos para el editor

const QuillEditor = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={{
        toolbar: [
          [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['bold', 'italic', 'underline'],
          ['link'],
          ['blockquote'],
          [{ 'align': [] }],
        ],
      }}
      theme="snow"
    />
  );
};

export default QuillEditor;  // Asegúrate de exportarlo por defecto
