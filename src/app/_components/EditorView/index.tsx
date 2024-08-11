
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
}: EditorViewProps) => {
  const [html, setHtml] = useState(defaultValue || "");

  const handleChange = (e: ContentEditableEvent) => {
    const cleanHtml = DOMPurify.sanitize(e.target.value, {
      USE_PROFILES: { html: true },
    });
    setHtml(cleanHtml);
    onChange && onChange(cleanHtml);
  };

  useEffect(() => {
    setHtml(defaultValue || "");
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
          },
        }}
        value={html}
        onChange={handleChange}
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
      </Editor>
    </EditorProvider>
  );
};

