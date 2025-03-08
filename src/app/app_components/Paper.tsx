"use client";
import {
  AiOutlineBlock,
  AiOutlineEdit,
  AiOutlineFilePpt,
  AiOutlineFileUnknown,
  AiOutlineRobot,
} from "react-icons/ai";
import { cn } from "@/utils/class-join";
import ExpandButton from "./sub-components/ExpandButton";
import { useState } from "react";
import { Mode } from "./types";
import ModeControl from "./panels/ModeControl";

export default function Paper(props: {
  rightCollapsed: boolean;
  leftCollapsed: boolean;
}) {
  const [mode, setMode] = useState<Mode>("Write");

  return (
    <div
      className={cn(
        props.rightCollapsed && props.leftCollapsed
          ? "w-full"
          : props.leftCollapsed || props.rightCollapsed
          ? "w-[90%]"
          : "w-[75%]",
        "relative h-full bg-background text-secondary px-8 ease-in-out duration-200"
      )}
    >
      <ModeControl mode={mode} rightCollapsed={props.rightCollapsed} />
      <ExpandButton
        className="absolute bottom-3 -left-[0.25] h-8"
        mode={mode}
        onButtonClick={(label) => setMode(label)}
        buttonContent={[
          { icon: <AiOutlineEdit />, label: "Write" },
          { icon: <AiOutlineFileUnknown />, label: "Pre-Plan" },
          { icon: <AiOutlineFilePpt />, label: "Plan" },
          { icon: <AiOutlineBlock />, label: "Nexus" },
          { icon: <AiOutlineRobot />, label: "Chat" },
        ]}
      />
    </div>
  );
}
