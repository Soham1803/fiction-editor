'use client';
import React, { useState } from "react";
import CollapseExpand from "./sub-components/CollapseExpand";
import { cn } from "@/utils/class-join";

export default function LeftSidebar() {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    return (
        <div className={cn(collapsed ? "w-10": "w-[20%]","relative mt-11 h-[calc(100vh-2.75rem)] bg-primary rounded-r-md ease-in-out duration-200")}>
            <CollapseExpand side="left" collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
    )
}