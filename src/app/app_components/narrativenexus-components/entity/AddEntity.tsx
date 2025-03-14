import { cn } from "@/utils/class-join";
import ImageUploaderViewer from "../../sub-components/ImageUploaderViewer";
import InputList from "../../sub-components/InputList";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import EntityDetails from "./EntityDetails";
import { Entity, EntityType } from "./entity-types";
import AddEntityList from "./AddEntityList";
import TitleDescription from "../../sub-components/TitleDescription";
import { AiOutlineMore } from "react-icons/ai";
import EntityTrackingOptions from "./EntityTrackingOptions";

export default function AddEntity({
  entity,
  setChoosenEntityType,
  className,
}: {
  entity: Entity;
  setChoosenEntityType: React.Dispatch<React.SetStateAction<EntityType | "">>;
  className?: string;
}) {
  const [detailOption, setDetailOption] = useState<
    "description" | "inspiration" | "mentions" | "relations"
  >("description");
  const [changeEntityOpen, setChangeEntityOpen] = useState<boolean>(false);
  const [entityTrackingOpen, setEntityTrackingOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Stop if entity type is empty (component not shown)
      if (entity.type === "") return;

      // Check if click is outside and component is mounted
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        event.preventDefault();
        event.stopPropagation();
        setChoosenEntityType("");
      }
    };

    // Only add listener if component is visible
    if (entity.type !== "") {
      document.addEventListener("mousedown", handleClickOutside, true); // Using capture phase
      return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }
  }, [entity.type, setChoosenEntityType]);

  return (
    entity.type !== "" && (
      <div
        ref={containerRef}
        className={cn(
          className,
          "bg-primary flex flex-col items-start justify-start p-1 text-text-secondary mt-secondary rounded-theme ease-in-out duration-500 overflow-hidden", 
        )}
        // Add mousedown handler to prevent event from bubbling
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            "flex flex-col w-full transition-all duration-500 ease-in-out h-full px-1"
          )}
        >
          <div className="relative flex flex-row justify-between gap-1 items-center text-sm text-text-primary h-[2rem] rounded-theme">
            <button
              onClick={() => setChangeEntityOpen((prev) => !prev)}
              className="flex flex-row items-center py-1 px-2 rounded-theme gap-1 hover:bg-hover-bg cursor-pointer ease-in-out duration-150"
            >
              <span className="underline">{entity.type}</span>{" "}
              <FaChevronDown className="text-[0.6rem]" />
              
              <AddEntityList
                setChoosenEntityType={setChoosenEntityType}
                open={changeEntityOpen}
                position="-left-1 top-7"
              />
            </button>
            <button
              onClick={() => setEntityTrackingOpen((prev) => !prev)}
              className="relative bg-primary text-text-secondary p-1 rounded-theme hover:bg-hover-bg ease-in-out duration-150"
            >
              <AiOutlineMore className="text-lg" />
              <EntityTrackingOptions open={entityTrackingOpen} className="right-1" />
            </button>
          </div>
          <div className="flex flex-row items-start justify-start w-full h-[35%] mt-1 text-base border-b-2 border-secondary">
            <div className="flex flex-col gap-1 w-[70%]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name" className="p-1">
                  Name
                </label>
                <input
                  className="rounded-md bg-background text-sm py-1 px-2"
                  type="text"
                  defaultValue={entity.name}
                  name="name"
                />
              </div>
              <div className="flex flex-col w-[80%]">
                <TitleDescription
                  title="Role/Tag"
                  description={`This will be used by AI to track this ${entity.type} entity.`}
                />
                <InputList
                  className="bg-background rounded-md mt-1"
                  aliases={entity.tag}
                />
              </div>
              <div className="flex flex-col w-full">
                <TitleDescription
                  title="Aliases"
                  description={`This will be used by AI to track this ${entity.type} entity.`}
                />
                <InputList
                  className="bg-background rounded-md mt-1"
                  aliases={entity.aliases}
                />
              </div>
            </div>
            <div className="w-[30%] flex flex-col items-end">
              <ImageUploaderViewer />
            </div>
          </div>

          <div className="flex flex-col w-full gap-1 h-[50%] mt-4">
            <div className="flex flex-row items-center bg-background rounded-theme justify-evenly mx-1 text-basef">
              <button
                onClick={() => setDetailOption("description")}
                className={cn(
                  detailOption === "description"
                    ? "bg-accent text-background"
                    : "bg-background",
                  "p-1 w-full rounded-theme"
                )}
              >
                Description
              </button>
              <button
                onClick={() => setDetailOption("inspiration")}
                className={cn(
                  detailOption === "inspiration"
                    ? "bg-accent text-background"
                    : "bg-background",
                  "p-1 w-full rounded-theme"
                )}
              >
                Inspiration
              </button>
              <button
                onClick={() => setDetailOption("mentions")}
                className={cn(
                  detailOption === "mentions"
                    ? "bg-accent text-background"
                    : "bg-background",
                  "p-1 w-full rounded-theme"
                )}
              >
                Mentions
              </button>
              <button
                onClick={() => setDetailOption("relations")}
                className={cn(
                  detailOption === "relations"
                    ? "bg-accent text-background"
                    : "bg-background",
                  "p-1 w-full rounded-theme"
                )}
              >
                Relations
              </button>
            </div>
            <EntityDetails entity={entity} infoType={detailOption} />
          </div>
        </div>
      </div>
    )
  );
}
