import { Extension, Editor } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
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

  // Slash Command Item Interface
export interface SlashCommandItem {
    title: string;
    description: string;
    icon?: string;
    action: (editor: Editor) => void;
  }
  
// Slash Command Extension
export const SlashCommandExtension = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        startOfLine: true,
        items: [] as SlashCommandItem[]
      }
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('slashCommand'),
        props: {
          // Handle decorations and slash command logic
          handleTextInput(view, from, to, text) {
            if (text === '/') {
              // Trigger slash command menu
              const plugin = view.state.plugins.find(plugin => plugin.spec.key === new PluginKey('slashCommand'));
              if (plugin) {
                plugin.spec.options.suggestion.showMenu = true;
              }
            }
            return false;
          }
        }
      })
    ];
  }
});
