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
    props.editor.chain().focus().setColor('#ededed').run();
    props.editor.chain().focus().unsetHighlight().run();
    props.editor.commands.insertContentAt(
      { from: selectionFrom, to: selectionTo },
      props.replaceTo
    );
    props.setReplaceTo("");
  };

  const handleDiscard = () => {
    props.setReplaceTo("");
    props.editor.chain().focus().setColor('#ededed').run();
    props.editor.chain().focus().unsetHighlight().run();
  };

  return (
    <div
      className="absolute flex flex-col w-4/5 h-fit cursor-pointer"
      style={{
        top:
          props.editor.view.coordsAtPos(
            props.editor.state.selection.$anchor.pos
          ).bottom - 50,
        left: 115,
      }}
    >
      <div className="flex flex-col items-start justify-between">
        <p>Replace with:</p>
        <textarea
          className="w-full h-60 p-4 resize-none rounded-md border-gray-950 border-2 focus:outline-none text-blue-950 italic"
          value={props.replaceTo}
          onChange={(e) => props.setReplaceTo(e.target.value)}
        />
      </div>
      <div className="flex flex-row items-center justify-between">
        <button onClick={handleTextReplace}>Replace</button>
        <button onClick={handleDiscard}>Discard</button>
      </div>
    </div>
  );
}
