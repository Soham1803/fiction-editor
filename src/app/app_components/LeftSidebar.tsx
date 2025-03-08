import React from "react";
import CollapseExpand from "./sub-components/CollapseExpand";
import { cn } from "@/utils/class-join";

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LeftSidebar(props: SidebarProps) {
  
  return (
    <div
      className={cn(
        props.collapsed ? "w-10" : "w-[20%]",
        "relative h-full bg-backgound ease-in-out duration-200"
      )}
    >
      <CollapseExpand
        side="left"
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
      />

      <div
        className={cn(
          "flex flex-row items-center justify-between h-10 bg-primary mt-primary",
          props.collapsed ? "w-0 hidden" : "w-full"
        )}
      ></div>
    </div>
  );
}
