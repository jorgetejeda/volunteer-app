import React, { useState } from "react";
import {
  BtnBold,
  BtnItalic,
  ContentEditableEvent,
  EditorProvider,
  Toolbar,
  Editor,
  BtnUndo,
  BtnRedo,
  Separator,
  BtnUnderline,
  BtnStrikeThrough,
  BtnNumberedList,
  BtnBulletList,
  BtnClearFormatting,
  BtnStyles,
} from "react-simple-wysiwyg";
import DOMPurify from "dompurify";

type EditorViewProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export const EditorView = ({ defaultValue, onChange }: EditorViewProps) => {
  const [html, setHtml] = useState(defaultValue || "");

  const handleChange = (e: ContentEditableEvent) => {
    const cleanHtml = DOMPurify.sanitize(e.target.value, {
      USE_PROFILES: { html: true },
    });
    setHtml(cleanHtml);
    onChange && onChange(cleanHtml);
  };

  return (
    <EditorProvider>
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
      >
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />

          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />

          <BtnNumberedList />
          <BtnBulletList />
          <Separator />

          <BtnClearFormatting />
          <Separator />
          <BtnStyles />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}