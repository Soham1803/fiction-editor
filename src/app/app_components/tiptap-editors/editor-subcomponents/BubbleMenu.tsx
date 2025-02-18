import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";

interface BubbleMenuProps {
  editor: Editor;
  handleReplace: () => void;
}

export default function MyBubbleMenu(props: BubbleMenuProps) {
  return (
    <BubbleMenu className="bg-background min-w-max rounded-md" editor={props.editor} tippyOptions={{ duration: 100 }}>
      <div className="flex flex-row rounded-md">
        <button
          onClick={() => props.editor.chain().focus().toggleBold().run()}
          className="p-2"
        >
          B
        </button>
        <button
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
          className="p-2"
        >
          I
        </button>
        <button
          onClick={() => props.editor.chain().focus().toggleStrike().run()}
          className="p-2"
        >
          S
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("left").run()
          }
          className="p-2"
        >
          Left
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("center").run()
          }
          className="p-2"
        >
          Center
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("right").run()
          }
          className="p-2"
        >
          Right
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("justify").run()
          }
          className="p-2"
        >
          Justify
        </button>
        <button onClick={props.handleReplace} className="rounded-md bg-background p-2">
          Replace
        </button>
      </div>
    </BubbleMenu>
  );
}
