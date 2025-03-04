import { cn } from "@/utils/class-join";
import { EntityType } from "./entity-types";

export default function AddEntityList(props: { open: boolean, position: string, setChoosenEntityType: React.Dispatch<React.SetStateAction<"" | EntityType>> }) {

  
  return (
    <div
      className={cn(
        props.open
          ? "w-36 h-40"
          : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
        "absolute z-10 bg-primary flex flex-col items-start text-text-secondary mt-secondary rounded-theme ease-in-out duration-200",
        props.position

      )}
    >
      <div
        className={cn(
          "w-full h-8 flex items-center text-xs p-1 cursor-pointer font-semibold bg-secondary rounded-t-theme ease-in-out duration-200"
        )}
      >
        Choose Entity
      </div>
      <div
        onClick={() => props.setChoosenEntityType("Character")}
        className={cn(
          props.open
        ? "w-full h-8"
        : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
          "flex items-center w-full h-8 text-xs p-1 cursor-pointer rounded-theme hover:bg-hover-bg ease-in-out duration-200"
        )}
      >
        Character
      </div>
      <div
        onClick={() => props.setChoosenEntityType("Location")}
        className={cn(
          props.open
        ? "w-full h-8"
        : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
          "flex items-center w-full h-8 text-xs p-1 cursor-pointer rounded-theme hover:bg-hover-bg ease-in-out duration-200"
        )}
      >
        Location
      </div>
      <div
        onClick={() => props.setChoosenEntityType("Item/Object")}
        className={cn(
          props.open
        ? "w-full h-8"
        : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
          "flex items-center w-full h-8 text-xs p-1 cursor-pointer rounded-theme hover:bg-hover-bg ease-in-out duration-200"
        )}
      >
        Item/Objects
      </div>
      <div
        onClick={() => props.setChoosenEntityType("Lore")}
        className={cn(
          props.open
        ? "w-full h-8"
        : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
          "flex items-center w-full h-8 text-xs p-1 cursor-pointer rounded-theme hover:bg-hover-bg ease-in-out duration-200"
        )}
      >
        Lore
      </div>
      <div
        onClick={() => props.setChoosenEntityType("Other")}
        className={cn(
          props.open
        ? "w-full h-8"
        : "h-0 w-0 opacity-0 text-opacity-0 pointer-events-none",
          "flex items-center w-full h-8 text-xs p-1 cursor-pointer rounded-theme hover:bg-hover-bg ease-in-out duration-200"
        )}
      >
        Other
      </div>
    </div>
  );
}
