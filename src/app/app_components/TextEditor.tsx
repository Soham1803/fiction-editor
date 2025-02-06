'use client'

import { useState, useRef } from 'react';

export default function TextEditor() {
    const [showMenu, setShowMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleSelect = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const selectedText = e.target.value.substring(
            e.target.selectionStart,
            e.target.selectionEnd
        );
        if (selectedText) {
            const rect = e.target.getBoundingClientRect();
            const selectionStart = e.target.selectionStart;
            const selectionEnd = e.target.selectionEnd;
            const startPos = e.target.value.substring(0, selectionStart).split('\n').length;
            const endPos = e.target.value.substring(0, selectionEnd).split('\n').length;
            const lineHeight = rect.height / e.target.rows;
            setMenuPosition({
                x: rect.left + window.scrollX,
                y: (startPos + endPos) / 2 * lineHeight
            });
            setShowMenu(true);
        } else {
            setShowMenu(false);
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        handleSelect(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        handleSelect(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
    }

    const applyStyle = (style: string) => {
        if (textAreaRef.current) {
            const selectedText = textAreaRef.current.value.substring(
                textAreaRef.current.selectionStart,
                textAreaRef.current.selectionEnd
            );
            textAreaRef.current.setRangeText(
                `${style}${selectedText}${style}`,
                textAreaRef.current.selectionStart,
                textAreaRef.current.selectionEnd,
                'end'
            );
            setShowMenu(false);
        }
    }

    return (
        <div className="relative mt-11 h-[calc(100vh-2.75rem)] w-[60%] bg-slate-300 p-1">
            <textarea 
                ref={textAreaRef}
                className="w-full h-full border-0 focus:outline-none rounded-lg p-32 text-slate-500 resize-none" 
                onMouseUp={handleMouseUp}
                onKeyUp={handleKeyUp}
            />
            {showMenu && (
                <div 
                    className="absolute bg-white text-slate-600 px-4 border rounded shadow-md p-2"
                    style={{ top: menuPosition.y, left: menuPosition.x }}
                >
                    <button onClick={() => applyStyle('**')} className="mr-2">B</button>
                    <button onClick={() => applyStyle('*')}>I</button>
                </div>
            )}
        </div>
    )
}