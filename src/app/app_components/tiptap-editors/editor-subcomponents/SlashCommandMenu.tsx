import React, { useState, useMemo, useEffect, KeyboardEvent } from "react";
import { Editor } from "@tiptap/core";
import { SlashCommandItem } from "../Extensions";

export const SlashCommandMenu: React.FC<{
  items: SlashCommandItem[];
  editor: Editor;
  onClose: () => void;
}> = ({ items, editor, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [items, searchTerm]);

  // Reset selection when search results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
    // Prevent all keyboard events from bubbling up
    e.preventDefault();
    e.stopPropagation();

    switch (e.key) {
      case 'ArrowUp':
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
        break;
      case 'ArrowDown':
        setSelectedIndex(prev => 
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
        break;
      case 'Enter':
        if (filteredItems[selectedIndex]) {
          handleItemSelect(filteredItems[selectedIndex]);
        }
        break;
      case 'Escape':
        onClose();
        break;
    }
  };

  const handleItemSelect = (item: SlashCommandItem) => {
    // Store the current position
    // const currentNode = editor.state.selection.$anchor.parent
    const pos = editor.state.selection.$anchor.pos

    // Chain commands to ensure atomic operation
    editor.chain()
      .focus()
      // Delete the slash character
      .command(({ tr }) => {
        tr.delete(pos - 1, pos)
        return true
      })
      // Run the selected command
      .run()

    // Execute the slash command action
    item.action(editor)
    onClose()
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
      onKeyDown={handleKeyDown} // Add handler to container
      tabIndex={-1} // Make div focusable
    >
      <input
        type="text"
        placeholder="Search commands..."
        value={searchTerm}
        onChange={(e) => {
          e.stopPropagation(); // Prevent input changes from bubbling
          setSearchTerm(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        className="bg-background w-full rounded-sm px-2 py-1 text-sm focus:outline-none"
        autoFocus // Automatically focus input when menu opens
      />
      <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col p-1 text-sm rounded-sm transition-colors duration-75 ${
              index === selectedIndex 
                ? 'bg-accent text-primary' 
                : 'hover:bg-hover-bg hover:text-accent'
            }`}
            onClick={() => handleItemSelect(item)}
          >
            {item.title}
            <span className="text-xs opacity-75">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
