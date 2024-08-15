import React, { useEffect, useState } from "react";
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
import theme from "@/theme";
import { Box } from "@mui/material";

type EditorViewProps = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  undo?: boolean;
  redo?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikeThrough?: boolean;
  numberedList?: boolean;
  bulletList?: boolean;
  clearFormatting?: boolean;
  styles?: boolean;
  placeholder?: string;
};

export const EditorView = ({
  defaultValue,
  onChange,
  undo,
  redo,
  bold,
  italic,
  underline,
  strikeThrough,
  numberedList,
  bulletList,
  clearFormatting,
  styles,
  placeholder, // Añadir placeholder como prop
}: EditorViewProps) => {
  const [html, setHtml] = useState(defaultValue || "");
  const [isEmpty, setIsEmpty] = useState(!defaultValue || defaultValue.trim() === "");

  const handleChange = (e: ContentEditableEvent) => {
    const cleanHtml = DOMPurify.sanitize(e.target.value, {
      USE_PROFILES: { html: true },
    });
    setHtml(cleanHtml);
    setIsEmpty(cleanHtml.trim() === "");
    onChange && onChange(cleanHtml);
  };

  useEffect(() => {
    setHtml(defaultValue || "");
    setIsEmpty(!defaultValue || defaultValue.trim() === "");
  }, [defaultValue]);

  return (
    <EditorProvider>
      <Editor
        containerProps={{
          style: {
            resize: "vertical",
            height: "300px",
            overflow: "auto",
            backgroundColor: theme.palette.common.white,
            position: "relative", 
          },
        }}
        value={html}
        onChange={handleChange}
        onFocus={() => setIsEmpty(html.trim() === "")} 
        onBlur={() => setIsEmpty(html.trim() === "")} 
      >
        <Toolbar>
          {undo && <BtnUndo />}
          {redo && <BtnRedo />}
          {undo || redo ? <Separator /> : null}

          {bold && <BtnBold />}
          {italic && <BtnItalic />}
          {underline && <BtnUnderline />}
          {strikeThrough && <BtnStrikeThrough />}
          {(bold || italic || underline || strikeThrough) && <Separator />}

          {numberedList && <BtnNumberedList />}
          {bulletList && <BtnBulletList />}
          {(numberedList || bulletList) && <Separator />}

          {clearFormatting && <BtnClearFormatting />}
          {clearFormatting && <Separator />}

          {styles && <BtnStyles />}
        </Toolbar>
        {isEmpty && (
          <Box
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              pointerEvents: "none",
              color: "#999",
              padding: "10px",
              width: "100%",
              height: "30%",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              whiteSpace: "pre-wrap",
              lineHeight: "1.5",
              fontSize: "0.875rem",
              zIndex: 0,
            }}
          >
            {placeholder}
          </Box>
        )}
      </Editor>
    </EditorProvider>
  );
};
