import { useState } from "react";
import { cn } from "@/utils/class-join";
import { FaChevronDown } from "react-icons/fa";
import { EntityType } from "../entity/entity-types";

interface SBNexusEntityListProps {
  entityType: EntityType;
  entities: string[];
}

export default function SBNexusEntityList(props: SBNexusEntityListProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full min-h-10 flex flex-col items-start justify-start">
      {/* Header */}
      <div className="h-10 w-full bg-secondary flex flex-row items-center justify-between py-1 px-2 text-text-secondary mt-primary">
        <span className="text-sm">{props.entityType}</span>
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            isOpen ? "rotate-0" : "rotate-90",
            "h-full w-8 flex items-center justify-center rounded-full hover:bg-hover-bg ease-in-out duration-300 text-xs"
          )}
        >
          <FaChevronDown />
        </div>
      </div>
      
        {/* List */}
      <div
        className={cn(
          isOpen ? "max-h-40" : "max-h-0", // Use max-height instead of height
          "bg-background overflow-hidden ease-in-out duration-300 w-full overflow-y-auto"
        )}
      >
        {props.entities.map((entity, index) => (
          <div
            key={index}
            className="h-10 w-full hover:bg-primary flex flex-row items-center justify-between py-1 px-2 mt-primary ease-in-out duration-700"
          >
            <span className="text-sm">{entity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
