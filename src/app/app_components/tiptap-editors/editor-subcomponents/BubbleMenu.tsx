import { Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react";
import { AiOutlineBold, AiOutlineItalic, AiOutlineStrikethrough, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter} from "react-icons/ai";
import { RiAlignJustify } from "react-icons/ri";
import { BsFiletypeAi } from "react-icons/bs";
import { cn } from "@/utils/class-join";


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
          className={cn(props.editor.isActive('bold')?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineBold />
        </button>
        <button
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
          className={cn(props.editor.isActive('italic')?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineItalic />
        </button>
        <button
          onClick={() => props.editor.chain().focus().toggleStrike().run()}
          className={cn(props.editor.isActive('strike')?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineStrikethrough />
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("left").run()
          }
          className={cn(props.editor.isActive({textAlign : 'left'})?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineAlignLeft />
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("center").run()
          }
          className={cn(props.editor.isActive({textAlign : 'center'})?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineAlignCenter />
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("right").run()
          }
          className={cn(props.editor.isActive({textAlign : 'right'})?"text-accent":"","p-2 hover:text-accent")}
        >
          <AiOutlineAlignRight />
        </button>
        <button
          onClick={() =>
            props.editor.chain().focus().setTextAlign("justify").run()
          }
          className={cn(props.editor.isActive({textAlign : 'justify'})?"text-accent":"","p-2 hover:text-accent")}
        >
          <RiAlignJustify />
        </button>
        <button onClick={props.handleReplace} className={cn("rounded-md bg-background p-2 hover:text-accent")}>
          <BsFiletypeAi />
        </button>
      </div>
    </BubbleMenu>
  );
}
