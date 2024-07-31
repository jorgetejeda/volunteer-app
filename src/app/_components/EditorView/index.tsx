import React, { useState } from "react";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

type EditorViewProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};
export const EditorView = ({ defaultValue, onChange }: EditorViewProps) => {
  const [html, setHtml] = useState(defaultValue || "");
  
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
