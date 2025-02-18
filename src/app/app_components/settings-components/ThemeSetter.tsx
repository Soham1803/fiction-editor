'use client'

import React, {useState, useEffect} from 'react';


export default function ThemeSetter() {
    const [theme, setTheme] = useState('light');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    return (
        <div className='flex flex-row items-center justify-evenly gap-3 text-text-secondary'>
            <button onClick={() => setTheme('light')}>Light</button>
            <button onClick={() => setTheme('dark')}>Dark</button>
            <button onClick={() => setTheme('sepia')}>Sepia</button>
            <button onClick={() => setTheme('forest')}>Forest</button>            
        </div>
    )
}