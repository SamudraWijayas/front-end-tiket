import {
  Bold,
  Italic,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `p-2 rounded-md hover:bg-gray-200 ${isActive ? "bg-gray-300" : ""}`;

  return (
    <div className="mb-2 flex flex-wrap gap-2 border-b pb-2">
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={buttonClass(editor.isActive("paragraph"))}
      >
        P{" "}
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
      >
        <Italic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={buttonClass(editor.isActive({ textAlign: "left" }))}
      >
        <AlignLeft size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={buttonClass(editor.isActive({ textAlign: "center" }))}
      >
        <AlignCenter size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={buttonClass(editor.isActive({ textAlign: "right" }))}
      >
        <AlignRight size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={buttonClass(editor.isActive({ textAlign: "justify" }))}
      >
        <AlignJustify size={18} />
      </button>
    </div>
  );
};

export default MenuBar;
