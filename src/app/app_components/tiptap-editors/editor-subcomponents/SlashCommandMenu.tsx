import React, { useState, useMemo } from 'react';
import { Editor } from '@tiptap/core';
import { SlashCommandItem } from '../Extensions';

export const SlashCommandMenu: React.FC<{
    items: SlashCommandItem[];
    editor: Editor;
    onClose: () => void;
  }> = ({ items, editor, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredItems = useMemo(() => {
      return items.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [items, searchTerm]);
  
    const handleItemSelect = (item: SlashCommandItem) => {
      item.action(editor);
      onClose();
    };
  
    return (
      <div 
        className="absolute bg-slate-900 cursor-pointer"
        style={{
          top: editor.view.coordsAtPos(editor.state.selection.$anchor.pos).bottom - 50,
          left: 130,
        }}
      >
        <input 
          type="text"
          placeholder="Search commands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="command-list">
          {filteredItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col hover:bg-slate-800 active:bg-slate-700"
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