"use client";
// import { useState } from "react"
import { cn } from "@/utils/class-join";
import { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { MdDragIndicator } from "react-icons/md";

export default function Plan() {
  const [expandAct, setExpandAct] = useState(false);

  return (
    <div className="w-full h-[93%] py-2 px-1">
      <div className="w-full text-center">
        <h2 className={cn("")}>Planning Board</h2>
      </div>

      <div className="w-full h-[93%] overflow-y-auto overflow-x-hidden">
        <div className="w-full">
          {/* Act */}
          <div
            className={cn(
              expandAct ? "h-[30rem]" : "h-16",
              "flex flex-col items-start justify-start w-[11/12] m-2 rounded-theme ease-in-out duration-300"
            )}
          >
            {/* Act control bar */}
            <div className="h-16 w-full flex items-center p-4 justify-between">
              <h3>Act</h3>
              <button
                onClick={() => setExpandAct((prev) => !prev)}
                className={cn(
                  expandAct ? "rotate-0" : "rotate-90",
                  "h-8 w-8 flex items-center justify-center rounded-full hover:bg-hover-bg ease-in-out duration-300 text-sm"
                )}
              >
                <FaChevronDown />
              </button>
            </div>

            {expandAct && (
              <div className="w-full h-[26rem] overflow-y-auto py-1">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-2 p-2 h-full">
                  {Array(30)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col h-96 bg-primary rounded-md"
                      >
                        <div className="flex items-center h-8 w-full justify-between p-1">
                          <span className="rounded-theme p-1 hover:bg-hover-bg">
                            <MdDragIndicator />
                          </span>
                          <h4>Chapter {i + 1}</h4>
                          <button>
                            <AiOutlineMore />
                          </button>
                        </div>
                        <div className="flex flex-col w-full h-[22rem] bg-background rounded-md">

                        </div>
                      </div>
                    ))}
                  <div className="flex flex-col h-96 items-center justify-center bg-secondary rounded-md">
                    <span className="text-background">Add Chapter</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
