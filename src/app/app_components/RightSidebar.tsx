"use client";
import { cn } from "@/utils/class-join";
import { useState } from "react";
import CollapseExpand from "./sub-components/CollapseExpand";
import SBNexus from "./narrativenexus-components/sidebar-components/SBNexus";

type RSBTabs = "chat" | "narrativeNexus";

export default function RightSidebar(props: { collapsed: boolean, setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) {  

  const [activeTab, setActiveTab] = useState<RSBTabs>("chat");
  return (
    <div
      className={cn(
        !props.collapsed ? "w-10" : "min-w-[25%]",
        "relative flex flex-col items-center justify-start h-full bg-background ease-in-out duration-200"
      )}
    >
      <CollapseExpand
        collapsed={props.collapsed}
        setCollapsed={props.setCollapsed}
        side="right"
      />

      {/* Tabs */}
      <div
        className={cn(
          "flex flex-row items-center justify-between h-10 bg-primary mt-primary",
          !props.collapsed ? "w-0 hidden" : "w-full"
        )}
      >
        <button
          onClick={() => setActiveTab("chat")}
          className={cn(
            activeTab === "chat" ? "bg-accent text-primary" : "bg-secondary",
            !props.collapsed ? "w-0" : "w-1/2",
            " h-full transition-colors duration-200"
          )}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("narrativeNexus")}
          className={cn(
            activeTab === "narrativeNexus"
              ? "bg-accent text-primary"
              : "bg-secondary",
            !props.collapsed ? "w-0" : "w-1/2",
            "h-full transition-colors duration-200"
          )}
        >
          Narrative Nexus
        </button>
      </div>
      {props.collapsed && activeTab === "narrativeNexus" && <SBNexus />}
    </div>
  );
}
