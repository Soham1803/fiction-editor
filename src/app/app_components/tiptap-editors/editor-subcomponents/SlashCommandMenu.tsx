import React, { useState, useMemo } from "react";
import { Editor } from "@tiptap/core";
import { SlashCommandItem } from "../Extensions";

export const SlashCommandMenu: React.FC<{
  items: SlashCommandItem[];
  editor: Editor;
  onClose: () => void;
}> = ({ items, editor, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  const handleItemSelect = (item: SlashCommandItem) => {
    item.action(editor);
    onClose();
  };

  return (
    <div
      className="absolute bg-primary cursor-pointer w-80 rounded-sm"
      style={{
        ...(editor.view.coordsAtPos(editor.state.selection.$anchor.pos).bottom >
        window.innerHeight - 200
          ? {
              bottom:
                window.innerHeight -
                editor.view.coordsAtPos(editor.state.selection.$anchor.pos)
                  .top +
                10,
            }
          : {
              top:
                editor.view.coordsAtPos(editor.state.selection.$anchor.pos)
                  .bottom - 50,
            }),
        left: 130,
      }}
    >
      <input
        type="text"
        placeholder="Search commands..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-background w-full rounded-sm px-2 py-1 text-sm focus:outline-none"
      />
      <div className="flex flex-col gap-1">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col hover:bg-hover-bg hover:text-accent active:bg-secondary p-1 text-sm rounded-sm"
            onClick={() => handleItemSelect(item)}
          >
            {item.title}
            <span className="text-xs">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
