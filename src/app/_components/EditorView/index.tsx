import React, { useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

type EditorViewProps = {
  placeholder: string;
  onChange?: (value: string) => void;
};
export const EditorView = ({ placeholder, onChange }: EditorViewProps) => {
  const [html, setHtml] = useState(placeholder || "");
  
  const handleChange = (e: ContentEditableEvent) => {
    setHtml(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <Editor
      containerProps={{
        style: {
          resize: "vertical",
          height: "300px",
          overflow: "auto",
          backgroundColor: "#fff",
        },
      }}
      value={html}
      onChange={handleChange}
    />
  );
};
