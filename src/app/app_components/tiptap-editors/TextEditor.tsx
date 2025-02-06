'use client'

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography'
import { Selection } from '@tiptap/pm/state';

export default function TextEditor() {

    const getAIResponse = async (text: string) => {
        const response = await fetch('http://localhost:3000/api/ai/summary-chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: text }),
        });
        const data = await response.json();
        return data;
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Typography,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        editorProps: {
            attributes: {
                class: 'p-24 text-lg w-full h-full focus:outline-none',
            },
        },
        content: `
            <h2>
                Hello World!
            </h2>
        `,
        immediatelyRender: false,
    });

    if (!editor) {
        return null;
    }

    const { empty: selectionIsEmpty, from: selectionFrom, to: selectionTo } = editor?.state.selection as Selection;
    const selectedText = selectionIsEmpty ? '' : editor?.state.doc.textBetween(selectionFrom, selectionTo, '\n');
    const handleReplace = async() => {
        const replaceTo = await getAIResponse(selectedText);
        if (!selectionIsEmpty) {
            editor?.commands.insertContentAt({ from: selectionFrom, to: selectionTo }, replaceTo);
        }
    }
    console.log(selectedText);
    

    return (
        <div className="relative mt-11 h-[calc(100vh-2.75rem)] w-[60%] bg-slate-400 p-1">
            <EditorContent className='h-full' editor={editor} />
            {editor && <BubbleMenu editor={editor} tippyOptions={{duration: 100}} >
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-2">B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-2">I</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className="p-2">S</button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className="p-2">Left</button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className="p-2">Center</button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className="p-2">Right</button>
                <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className="p-2">Justify</button>
                <button onClick={handleReplace} className="p-2">Replace</button>
            </BubbleMenu>}
        </div>
    )
}