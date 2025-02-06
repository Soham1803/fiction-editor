import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';

export const CharacterNameExtension = (characterNames: [string, string][]) => {
    return Extension.create({
      name: 'characterNameHighlight',
      addProseMirrorPlugins() {
        return [
          new Plugin({
            props: {
              decorations: (state) => {
                const { doc } = state;
                const decorations: Decoration[] = [];
  
                doc.descendants((node, pos) => {
                  if (node.type.name === 'text') {
                    const text = node.text || '';
                    characterNames.forEach(([name, color]) => {

                        const punctMarks = '.,!?;:';
                        if (punctMarks.includes(name[name.length - 1])) return;

                      const regex = new RegExp(`\\s${name}($|\\s|[.,!?;:])`, 'gi');
                      let match;
                      while ((match = regex.exec(text)) !== null) {
                        decorations.push(
                          Decoration.inline(
                            pos + match.index + 1, 
                            pos + match.index + match[0].length - 1, 
                            { 
                              class: 'character-name-highlight',
                              style: `color: ${color}; text-decoration: underline;`
                            }
                          )
                        );
                      }
                    });
                  }
                });
  
                return DecorationSet.create(doc, decorations);
              }
            }
          })
        ];
      }
    });
  };
