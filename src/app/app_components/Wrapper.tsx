'use client';
import { useState } from 'react';
import Paper from './Paper';
import RightSidebar from './RightSidebar';

export function Wrapper() {

    const [rightCollapsed, setRightCollapsed] = useState<boolean>(false);

    return (
        <div className='relative flex flex-row items-center justify-center mt-11 h-[calc(100vh-2.75rem)] w-[80%]'>  
            <Paper rightCollapsed={rightCollapsed} />
            <RightSidebar collapsed={rightCollapsed} setCollapsed={setRightCollapsed} />
        </div>
    )
}