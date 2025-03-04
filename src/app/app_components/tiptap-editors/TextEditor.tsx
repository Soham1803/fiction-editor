'use client'
import { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography'
import Heading from '@tiptap/extension-heading';
import { Selection } from '@tiptap/pm/state';
import CharacterCount from '@tiptap/extension-character-count';
import Placeholder from '@tiptap/extension-placeholder'
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

import { CharacterNameExtension, SlashCommandExtension, SlashCommandItem } from './Extensions';
import {SlashCommandMenu} from './editor-subcomponents/SlashCommandMenu';
import MyBubbleMenu from './editor-subcomponents/BubbleMenu';
import TextReplacer from './editor-subcomponents/TextReplacer';

// Slash Command Menu Component



export default function TextEditor() {

    const [showSlashMenu, setShowSlashMenu] = useState(false);
    const [replaceTo, setReplaceTo] = useState('');

    const getAIResponse = async (text: string) => {
        const response = await fetch('http://localhost:3000/api/ai/summary-chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: text }),
        });
        const data = await response.json();
        const ret = data.messages[data.messages.length - 1].kwargs.content;
        return ret;
    }

    const slashCommands: SlashCommandItem[] = [
        {
          title: 'AI Assist',
          description: 'Get AI-powered writing suggestions',
          action: () => {
            // Implement AI assistance logic
            console.log('AI Assist triggered');
          }
        },
        {
          title: 'Code Block',
          description: 'Insert a code block',
          action: (editor) => {
            editor.chain().focus().setCodeBlock({language: 'javascript'}).run();
          }
        },
        {
          title: 'Heading 1',
          description: 'Large section heading',
          action: (editor) => {
            editor.chain().focus().setHeading({ level: 1 }).run();
          }
        }
      ];
    

    const editor = useEditor({
        extensions: [
            Typography,
            CharacterCount,
            Color,
            TextStyle,
            Highlight.configure({
              multicolor: true,
            }),
            Heading.configure({
                levels: [1, 2, 3, 4],
            }),
            StarterKit,
            Placeholder.configure({
                placeholder: 'Type "/" to see available commands...',
            }),
            SlashCommandExtension.configure({
              suggestion: {
                // char: '/',
                // startOfLine: true,
                items: slashCommands,
                // component: SlashCommandMenu,
                // onOpen: () => setShowSlashMenu(true),
                // onClose: () => setShowSlashMenu(false),
              },
            }),
            CharacterNameExtension([['Alice', '#fad7a0'], ['Bob', '#82e0aa'], ['Soham Panchal', '#d7bde2'], ]),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        onTransaction: ({ editor }) => {
            // Check if '/' was just typed
            const { selection } = editor.state;
            const $anchor = selection.$anchor;
            const textBefore = editor.state.doc.textBetween(
              $anchor.pos - 1, 
              $anchor.pos, 
              '\n'
            );
      
            setShowSlashMenu(textBefore === '/');
          },
        editorProps: {
            attributes: {
                class: 'relative px-1 pt-16 text-lg w-full min-h-full focus:outline-none text-secondary',
            },
        },
        immediatelyRender: false,
    });

    const handleCloseSlashMenu = useCallback(() => {
        setShowSlashMenu(false);
        // Remove the '/' character
        editor?.chain().focus().deleteRange({ from: editor.state.selection.$anchor.pos - 1, to: editor.state.selection.$anchor.pos }).run();
      }, [editor]);

    if (!editor) {
        return null;
    }

    const { empty: selectionIsEmpty, from: selectionFrom, to: selectionTo } = editor?.state.selection as Selection;
    const selectedText = selectionIsEmpty ? '' : editor?.state.doc.textBetween(selectionFrom, selectionTo, '\n');

    const handleReplace = async() => {
        const aiText = await getAIResponse(selectedText);
        editor.chain().focus().setColor('var(--color-secondary)').run();
        editor.chain().focus().setHighlight({ color: 'var(--color-primary)' }).run();
        setReplaceTo(aiText);
    }
    // console.log(selectedText);
    

    return (
        <div className="relative my-1 h-full w-full bg-background p-1">
            <EditorContent className='h-full overflow-y-auto' editor={editor} />
            <div className='absolute top-3 right-10 flex items-center gap-5 text-xs p-2 bg-background rounded-xl text-secondary'>
                <p>Characters: {editor.storage.characterCount.characters()}</p>
                <p>Words: {editor.storage.characterCount.words()}</p>
            </div>
            {editor && <MyBubbleMenu editor={editor} handleReplace={handleReplace} />}
            {replaceTo !== '' && <TextReplacer editor={editor} replaceTo={replaceTo} setReplaceTo={setReplaceTo} />}
            {showSlashMenu && <SlashCommandMenu items={slashCommands} editor={editor} onClose={handleCloseSlashMenu} />}
        </div>
    )
}