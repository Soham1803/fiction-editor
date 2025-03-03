import { Editor } from "@tiptap/core";
import { Dispatch, SetStateAction } from "react";

interface TextReplacerProps {
  editor: Editor;
  replaceTo: string;
  setReplaceTo: Dispatch<SetStateAction<string>>;
}

export default function TextReplacer(props: TextReplacerProps) {
  const {
    empty: selectionIsEmpty,
    from: selectionFrom,
    to: selectionTo,
  } = props.editor?.state.selection;
  
  if(!selectionIsEmpty) {

  }

  const handleTextReplace = async () => {
    props.editor.chain().focus().setColor('var(--color-secondary)').run();
    props.editor.chain().focus().unsetHighlight().run();
    props.editor.commands.insertContentAt(
      { from: selectionFrom, to: selectionTo },
      props.replaceTo
    );
    props.setReplaceTo("");
  };

  const handleDiscard = () => {
    props.setReplaceTo("");
    props.editor.chain().focus().setColor('var(--color-secondary)').run();
    props.editor.chain().focus().unsetHighlight().run();
  };

  return (
    <div
      className="absolute flex flex-col w-4/5 h-fit cursor-pointer border-[1px] border-accent bg-primary text-sm rounded-md px-2 text-accent"
      style={{
        top:
          props.editor.view.coordsAtPos(
            props.editor.state.selection.$anchor.pos
          ).bottom - 300,
        left: 10,
      }}
    >
      <div className="flex flex-col items-start justify-between">
        <p className="p-1">Replace with:</p>
        <textarea
          className="w-full h-60 p-4 resize-none rounded-md text-base bg-background focus:outline-none text-secondary italic"
          value={props.replaceTo}
          onChange={(e) => props.setReplaceTo(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center justify-between p-1 text-xs">
        <button className="px-2 py-1 rounded-md hover:bg-hover-bg hover:text-text-secondary" onClick={handleTextReplace}>Replace</button>
        <button className="px-2 py-1 rounded-md hover:bg-hover-bg hover:text-red-500" onClick={handleDiscard}>Discard</button>
      </div>
    </div>
  );
}
