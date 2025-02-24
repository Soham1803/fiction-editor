import { cn } from "@/utils/class-join";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import TitleDescription from "../../sub-components/TitleDescription";

type TrackingOption = "always" | "context" | "manual" | "never";

export default function EntityTrackingOptions(props: {
  className: string;
  open: boolean;
}) {
  const [selectedOption, setSelectedOption] = useState<TrackingOption>("manual");

  const CustomRadio = ({ value, label, description }: { value: TrackingOption; label: string, description: string }) => (
    <label
      className={cn(
        !props.open ? "w-0 h-0 opacity-0 pointer-events-none" : "w-full",
        "flex items-center justify-start py-1 px-1 space-x-3 border-secondary cursor-pointer",
        selectedOption === value ? "bg-hover-bg text-background" : "text-secondary"
      )}
      onClick={() => setSelectedOption(value)}
    >
      <div className={cn(
        "w-4 h-4 flex items-center justify-center bg-transparent"
      )}>
        {selectedOption === value && <AiOutlineCheck className="text-lg" />}
      </div>
      <TitleDescription className="text-left" title={label} description={description} />
    </label>
  );

  return (
    <div
      className={cn(
        props.className,
        props.open ? "w-[17rem] h-72" : "w-0 h-0 opacity-0 pointer-events-none",
        "absolute flex flex-col items-start bg-primary rounded-theme border-[0.5px] border-secondary p-1 ease-in-out duration-200"
      )}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className={cn(props.open ? "flex flex-col w-full gap-1 border-b-[0.5px] border-secondary py-1" : "w-0 h-0")}>
        <CustomRadio value="always" label="Always track this entity" description="description" />
        <CustomRadio value="context" label="Track when detected in context" description="description" />
        <CustomRadio value="manual" label="Do not track automatically" description="description" />
        <CustomRadio value="never" label="Never track this entity" description="description" />
      </div>
    </div>
  );
}
