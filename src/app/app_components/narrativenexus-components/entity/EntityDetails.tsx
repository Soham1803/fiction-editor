import { useState } from "react";
import TitleDescription from "@/app/app_components/sub-components/TitleDescription";
import InputList from "@/app/app_components/sub-components/InputList";
import { cn } from "@/utils/class-join";
import { Entity } from "./entity-types";
import { AiOutlineEdit, AiOutlineLink } from "react-icons/ai";

export default function EntityDetails(props: {
  entity: Entity;
  infoType: "description" | "inspiration" | "mentions" | "relations";
}) {
  type MentionsType = "Manuscript" | "Summary" | "Nexus" | "Chats" | "Snippets";

  const [mentionsIn, setMentionsIn] = useState<MentionsType>("Manuscript");
  const [inspirationType, setInspirationType] = useState<"write" | "link">(
    "write"
  );

  if (props.infoType === "description") {
    return (
      <div className="flex flex-col w-full gap-3">
        <TitleDescription
          title="Description"
          description="This will be read by AI. Be clear, concise and keep AI comprehension and no. of tokens in mind."
        />
        <textarea
          className="rounded-md bg-background text-sm py-1 px-2 h-[30%] resize-none"
          name="description"
          defaultValue={props.entity.description}
        />

        <label className="p-1" htmlFor="description">
          Progressions (developments in the entity&apos;s life)
        </label>
        <textarea
          className="rounded-md bg-background text-sm py-1 px-2 h-[30%] resize-none"
          name="description"
          defaultValue={props.entity.description}
        />
      </div>
    );
  } else if (props.infoType === "inspiration") {
    return (
      <div className="flex flex-col w-full gap-1 h-full">
        <TitleDescription
          title="Inspiration"
          description={`What are your inspirations behind this ${props.entity.type}? You may mention anything like another book, story, tv-show, movie etc.`}
        />
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => setInspirationType("write")}
            className={cn(
              inspirationType === "write" ? "bg-secondary" : "bg-background",
              "flex flex-row items-center px-3 py-1 text-xs rounded-theme"
            )}
          >
            <AiOutlineEdit /> Write
          </button>
          <button
            onClick={() => setInspirationType("link")}
            className={cn(
              inspirationType === "link" ? "bg-secondary" : "bg-background",
              "flex flex-row items-center px-3 py-1 text-xs rounded-theme"
            )}
          >
            <AiOutlineLink /> Link
          </button>
        </div>
        {inspirationType === "write" ? (
          <textarea
            className="rounded-md bg-background text-sm py-1 px-2 h-5/6 resize-none focus:outline-none"
            name="inspiration"
            defaultValue={props.entity.inspiration}
            placeholder="Write your inspirations here"
          />
        ) : (
          <input
            className="rounded-md text-primary bg-background text-xs py-1 px-2 focus:outline-none"
            type="text"
            placeholder="Paste links here"
            name="inspiration"
          />
        )}
      </div>
    );
  } else if (props.infoType === "mentions") {
    return (
      <div className="flex flex-row w-full h-full gap-5 justify-between">
        <div className="flex flex-col w-[85%] gap-1">
          <TitleDescription
            title="Mentions"
            description="All the mentions of the entity in the narrative."
          />
          <InputList
            className="bg-background rounded-md"
            aliases={props.entity.mentions}
          />
        </div>
        <div className="flex flex-col w-[15%] justify-center gap-2 h-full">
          {(
            [
              "Manuscript",
              "Summary",
              "Nexus",
              "Chats",
              "Snippets",
            ] as MentionsType[]
          ).map((tab) => (
            <button
              key={tab}
              className={cn(
                mentionsIn === tab ? "bg-secondary" : "bg-background",
                "p-2 text-sm rounded-theme w-full"
              )}
              onClick={() => setMentionsIn(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    );
  } else if (props.infoType === "relations") {
    return (
      <div className="flex flex-col w-full gap-1">
        <TitleDescription
          title="Relations"
          description="All the relations of the entity in the narrative."
        />
        <InputList
          className="bg-background rounded-md"
          aliases={props.entity.mentions}
        />
      </div>
    );
  } else {
    return null;
  }
}
