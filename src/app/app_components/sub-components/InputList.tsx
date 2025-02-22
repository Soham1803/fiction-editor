import { cn } from "@/utils/class-join";
import { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface KeyboardEvent extends React.KeyboardEvent<HTMLInputElement> {
  key: string;
}

export default function InputList(props: { className?: string, aliases: string[] }) {
  const [aliases, setAliases] = useState<string[]>(props.aliases);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent): void => {
    if ((e.key === "Enter" || e.key === " ") && inputValue.trim()) {
      e.preventDefault();
      if (!aliases.includes(inputValue.trim())) {
        setAliases([...aliases, inputValue.trim()]);
        setInputValue("");
      }
    } else if (
      e.key === "Backspace" &&
      inputValue === "" &&
      aliases.length > 0
    ) {
      // Remove last tag when backspace is pressed on empty input
      setAliases(aliases.slice(0, -1));
    }
  };

  const removeSkill = (aliasToRemove: string) => {
    setAliases(aliases.filter((alias) => alias !== aliasToRemove));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={cn(props.className, "w-full max-h-14 px-1 py-2 overflow-y-auto")}>
      <div
        className="h-auto rounded-md flex flex-wrap gap-2 cursor-text"
        onClick={handleContainerClick}
      >
        {aliases.map((alias, index) => (
          <span
            key={index}
            className="inline-flex items-center rounded-md text-xs bg-primary text-text-secondary px-1"
          >
            {alias}
            <AiOutlineClose
              className="w-2 h-2 ml-1 hover:text-blue-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                removeSkill(alias);
              }}
            />
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="outline-none flex-grow border-none bg-transparent w-20 text-sm text-secondary"
        //   placeholder={
        //     skills.length === 0 ? "Type a aliases and press Space or Enter" : ""
        //   }
        />
      </div>
    </div>
  );
}
