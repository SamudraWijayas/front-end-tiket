"use client";

import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";

interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  isInvalid?: boolean;
  errorMessage?: string;
}

const RichTextEditor = ({
  value,
  onChange,
  isInvalid,
  errorMessage,
}: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "<p>Write your description...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-gray-200 rounded-xl py-2 px-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange?.(html); // update ke react-hook-form
    },
  });

  // biar value dari luar sinkron dengan editor
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      {isInvalid && (
        <p className="text-danger-500 mt-1 text-xs">{errorMessage}</p>
      )}
    </div>
  );
};

export default RichTextEditor;
