import { cn } from "@/utils/class-join";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

interface CollapseExpandProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  side: "left" | "right";
}

export default function CollapseExpand(props: CollapseExpandProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0",
        props.side === "right" ? "left-0" : "right-4",
      )}
    >
      {/* Collapser */}
      <button
        onClick={() => props.setCollapsed((prev) => !prev)}
        className={cn(
          props.collapsed
            ? "scale-0"
            : "absolute bottom-1 left-1 hover:bg-secondary hover:text-primary text-secondary p-1 rounded-xl flex items-center justify-center ease-in-out duration-200"
        )}
      >
        {props.side==='right' ? <HiChevronDoubleRight className="w-6 h-6" /> : <HiChevronDoubleLeft className="w-6 h-6" />}
      </button>
      {/* Expander */}
      <button
        onClick={() => props.setCollapsed((prev) => !prev)}
        className={cn(
          !props.collapsed
            ? "scale-0"
            : "absolute bottom-1 left-1 hover:bg-secondary hover:text-primary text-secondary p-1 rounded-xl flex items-center justify-center ease-in-out duration-200"
        )}
      >
        {props.side==='right' ? <HiChevronDoubleLeft className="w-6 h-6" /> : <HiChevronDoubleRight className="w-6 h-6" />}
      </button>
    </div>
  );
}
