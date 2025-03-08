'use client';
import { useState } from 'react';
import Paper from './Paper';
import RightSidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';

export function Wrapper() {

    const [rightCollapsed, setRightCollapsed] = useState<boolean>(false);
    const [leftCollapsed, setLeftCollapsed] = useState<boolean>(false);

    return (
        <div className='relative flex flex-row items-center justify-center mt-11 h-[calc(100vh-2.75rem)] w-full'>  
            <LeftSidebar collapsed={leftCollapsed} setCollapsed={setLeftCollapsed} />
            <Paper rightCollapsed={rightCollapsed} leftCollapsed={leftCollapsed} />
            <RightSidebar collapsed={rightCollapsed} setCollapsed={setRightCollapsed} />
        </div>
    )
}