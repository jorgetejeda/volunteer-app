import React, { useState } from "react";
import Editor from "react-simple-wysiwyg";

export const EditorView = () => {
  const [html, setHtml] = useState("my <b>content</b>");
  const customStyle = {
    style: {
      resize: "vertical",
    },
  };
  const handleChange = (e) => {
    setHtml(e.target.value);
  };

  return (
    <Editor containerProps={{
      style: {
        height: "300px",
        background: "#fff",
      },
    }} value={html} onChange={handleChange} />
  );
};


