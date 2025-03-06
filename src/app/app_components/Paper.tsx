"use client";

import { useState } from "react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import TextEditor from "./tiptap-editors/TextEditor";
import { cn } from "@/utils/class-join";

interface Manuscript {
  act: {
    name: string;
    chapters: Chapter[];
  };
}

interface Chapter {
  name: string;
  scenes: Scene[];
}

interface Scene {
  scene: string;
  content: string;
  summary: string;
}

export default function Paper(props: { rightCollapsed: boolean }) {
  const [manuscript, setManuscript] = useState<Manuscript | null>({
    act: {
      name: "Act 1",
      chapters: [
        {
          name: "Chapter1",
          scenes: [
            {
              scene: "Scene1",
              content: "This is the content of the scene",
              summary:
                "Jonah wakes up from the dream tensed, sweated forehead, and a racing heart. He looks around the room, trying to make sense of the dream he just had. He tries to remember the details of the dream, but it's all a blur. He gets up from the bed and walks to the window. The sun is shining bright, and the birds are chirping. He takes a deep breath and tries to calm himself down.",
            },
          ],
        },
      ],
    },
  });

  const handleAddChapter = () => {
    setManuscript((prev) =>
      prev
        ? {
            act: {
              ...prev.act,
              chapters: [
                ...prev.act.chapters,
                {
                  name: `Chapter${prev.act.chapters.length + 1}`,
                  scenes: [
                    {
                      scene: "Scene1",
                      content: "This is the content of the scene",
                      summary:
                        "Jonah wakes up from the dream tensed, sweated forehead, and a racing heart. He looks around the room, trying to make sense of the dream he just had. He tries to remember the details of the dream, but it's all a blur. He gets up from the bed and walks to the window. The sun is shining bright, and the birds are chirping. He takes a deep breath and tries to calm himself down.",
                    },
                  ],
                },
              ],
            },
          }
        : null
    );
  };

  const handleRemoveChapter = (chapterIndex: number) => {
    setManuscript((prev) =>
      prev
        ? {
            act: {
              ...prev.act,
              chapters: prev.act.chapters.filter(
                (_, index) => index !== chapterIndex
              ),
            },
          }
        : null
    );
  };

  const handleAddScene = (chapterIndex: number) => {
    setManuscript((prev) =>
      prev
        ? {
            act: {
              ...prev.act,
              chapters: prev.act.chapters.map((chapter, index) =>
                index === chapterIndex
                  ? {
                      ...chapter,
                      scenes: [
                        ...chapter.scenes,
                        {
                          scene: `Scene${chapter.scenes.length + 1}`,
                          content: "This is the content of the scene",
                          summary:
                            "Jonah wakes up from a dream tensed, sweated forehead, and a racing heart. He looks around the room, trying to make sense of the dream he just had. He tries to remember the details of the dream, but it's all a blur. He gets up from the bed and walks to the window. The sun is shining bright, and the birds are chirping. He takes a deep breath and tries to calm himself down.",
                        },
                      ],
                    }
                  : chapter
              ),
            },
          }
        : null
    );
  };

  const handleRemoveScene = (chapterIndex: number, sceneIndex: number) => {
    setManuscript((prev) =>
      prev
        ? {
            act: {
              ...prev.act,
              chapters: prev.act.chapters.map((chapter, index) =>
                index === chapterIndex
                  ? {
                      ...chapter,
                      scenes: chapter.scenes.filter(
                        (_, index) => index !== sceneIndex
                      ),
                    }
                  : chapter
              ),
            },
          }
        : null
    );
  };

  return (
    <div
      className={cn(
        props.rightCollapsed ? "w-[90%]" : "w-[75%]",
        "relative h-full bg-background text-secondary pt-8 pb-24 px-8 ease-in-out duration-200"
      )}
    >
      <div className="w-full text-center">
        <h2 className={cn(props.rightCollapsed?"w-[75%]":"w-full")} >{manuscript?.act.name}</h2>
      </div>

      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <div className="w-full">
          {manuscript?.act.chapters.map((chapter, cindex) => (
            <div
              className="flex flex-col items-start justify-start"
              key={cindex}
            >
              <div
                className={cn(
                
                  "w-full flex items-start justify-between h-8 font-semibold ease-in-out duration-200"
                )}
              >
                <h3>{chapter.name}</h3>
                <button
                  className="flex items-center justify-center mt-1 rounded-theme hover:bg-secondary hover:text-red-500 p-1"
                  onClick={() => handleRemoveChapter(cindex)}
                >
                  <AiOutlineClose className="text-xl" />
                </button>
              </div>
              <div className="w-full p-2">
                {chapter.scenes.map((scene, sindex) => (
                  <div className="w-full" key={sindex}>
                    <div
                      className={cn(
                        
                        "relative w-full flex items-center justify-between h-5 ease-in-out duration-200"
                      )}
                    >
                      <h4 className={cn(props.rightCollapsed ?"w-[75%]" :"w-full" ,"font-semibold text-center underline")}>
                        {scene.scene}
                      </h4>
                      <button
                        className="flex items-center justify-center rounded-theme hover:bg-secondary hover:text-red-500 p-1"
                        onClick={() => handleRemoveScene(cindex, sindex)}
                      >
                        <AiOutlineClose className="text-lg" />
                      </button>
                    </div>

                    <div className="flex items-start justify-between w-full">
                      <div
                        className={cn(
                          "w-full my-2 py-2 ease-in-out duration-200"
                        )}
                      >
                        <TextEditor />
                      <div className="w-full h-[1px] border-b-[1px] border-dashed border-secondary my-12" />
                      </div>
                      {props.rightCollapsed && (
                        <div
                          className={cn("sticky top-5 w-[30%] p-4 mt-5")}
                          style={{ alignSelf: "flex-start" }}
                        >
                          <h4>Summary:</h4>
                          <p className="text-base">{scene.summary}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  className="flex items-center p-1 mt-5 rounded-theme bg-primary text-xs hover:bg-secondary hover:text-primary"
                  onClick={() => handleAddScene(cindex)}
                >
                  <AiOutlinePlus />
                  <span>Add Scene</span>
                </button>
              </div>
            </div>
          ))}

          <button
            className="flex items-center p-1 mb-5 rounded-theme bg-primary text-xs hover:bg-secondary hover:text-primary"
            onClick={handleAddChapter}
          >
            <AiOutlinePlus />
            <span>Add Chapter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
