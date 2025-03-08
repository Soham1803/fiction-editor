import React, { useState, ReactNode } from 'react';
import { cn } from '@/utils/class-join';
import { Mode } from '../types';
// import { AiOutlinePlus } from 'react-icons/ai';

interface ExpandButtonProps {
  buttonContent: {
    icon: ReactNode;
    label: Mode;
  }[];
  onButtonClick?: (label: Mode) => void;
  className: string;
  mode: Mode
}

export default function ExpandButton(props: ExpandButtonProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleButtonClick = (label: Mode) => {
    if (props.onButtonClick) {
      props.onButtonClick(label);
    }
    toggleExpand();
  };

  return (
    <div className={cn(props.className,)}>
      {/* Main round button */}
      <button
        className={cn(
          expanded ? "bg-hover-bg text-text-secondary border-text-secondary" : "bg-primary text-secondary border-secondary",
          "rounded-full text-base flex items-center justify-center p-2 border-[1px] z-10 relative ease-in-out duration-100"
        )}
        onClick={toggleExpand}
      >
        {props.buttonContent.map((btn, index) => {
            if(btn.label === props.mode){
                return (
                    <div key={index} className='w-auto h-auto p-0'>
                        {btn.icon}
                    </div>
                )
            }
        })}
      </button>

      {/* Container for expandable buttons */}
      <div className="absolute left-8 bottom-1 flex">
        {props.buttonContent.map((content, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(content.label as Mode)}
            className={cn(
              "h-6 rounded-md px-2 py-1 bg-primary border-[1px] border-secondary text-secondary flex items-center justify-center",
              "transform transition-all duration-100 ease-in-out whitespace-nowrap",
              expanded ? "opacity-100" : "opacity-0 scale-75 pointer-events-none",
              "hover:bg-secondary hover:text-text-secondary hover:border-text-secondary"
            )}
            style={{
              transitionDelay: expanded 
                ? `${index * 15}ms` 
                : `${(props.buttonContent.length - index - 1) * 15}ms`,
              transform: expanded 
                ? `translateX(${(index + 1) * 0.5}rem)` 
                : 'translateX(0)',
              minWidth: content.label ? 'auto' : '2rem',
              maxWidth: '12rem'
            }}
          >
            <span className="flex items-center gap-1">
              {content.icon}
              {content.label && <span className="text-base">{content.label}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

