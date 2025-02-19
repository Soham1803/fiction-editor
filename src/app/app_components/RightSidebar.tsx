"use client";
import { cn } from "@/utils/class-join";
import { useState } from "react";
import CollapseExpand from "./sub-components/CollapseExpand";

type RSBTabs = "chat" | "narrativeNexus";

export default function RightSidebar() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<RSBTabs>("chat");
  return (
    <div className={cn(collapsed ?"w-10": "w-[20%]" ,"relative flex flex-col items-center justify-start mt-11  h-[calc(100vh-2.75rem)] rounded-l-md bg-primary ease-in-out duration-200")}>
        <CollapseExpand collapsed={collapsed} setCollapsed={setCollapsed} side="right" />
        
        {/* Tabs */}
      <div className={cn("flex flex-row items-center justify-between h-10 bg-primary mt-primary", collapsed ? "w-0 hidden" : "w-full")}>
        <button
          onClick={() => setActiveTab("chat")}
          className={cn(activeTab === 'chat' ? "bg-accent text-primary": "bg-secondary", collapsed ? "w-0": "w-1/2"," h-full transition-colors duration-200")}
        >
          Chat
        </button>
        <button
          onClick={() => setActiveTab("narrativeNexus")}
          className={cn(activeTab === 'narrativeNexus' ? "bg-accent text-primary": "bg-secondary", collapsed ? "w-0":"w-1/2", "h-full transition-colors duration-200")}
        >
          Narrative Nexus
        </button>
      </div>
    </div>
  );
}
