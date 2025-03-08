"use client";
// import { useState } from "react"
import { cn } from "@/utils/class-join";
import EntityButton from "../narrativenexus-components/panel-components/EntityButton";
import { EntityType } from "../narrativenexus-components/entity/entity-types";
import { useState } from "react";
import EntityList from "../narrativenexus-components/panel-components/EntityList";
import { HiChevronLeft } from "react-icons/hi";

export default function Nexus() {
  const [chooseEntity, setChooseEntity] = useState<EntityType | "">("");

  return (
    <div className="w-full h-[93%] py-2 px-1">
      <div className="w-full text-center">
        <h2 className={cn()}>Narrative Nexus</h2>
        <div className="w-full flex flex-row items-center justify-between p-4">
          {chooseEntity !== "" && (
            <button
              onClick={() => setChooseEntity("")}
              className="p-1 rounded-full bg-primary"
            >
              <HiChevronLeft className="w-7 h-7" />
            </button>
          )}
          <h4 className="italic">Manage your story elements here</h4>
        </div>
      </div>

      {chooseEntity === "" ? (
        <div className="flex flex-col gap-2 w-full h-[100%] px-5 overflow-y-auto overflow-x-hidden">
          <EntityButton
            onClick={() => setChooseEntity("Character")}
            type="Character"
          />
          <EntityButton
            onClick={() => setChooseEntity("Location")}
            type="Location"
          />
          <EntityButton
            onClick={() => setChooseEntity("Item/Object")}
            type="Item/Object"
          />
          <EntityButton onClick={() => setChooseEntity("Lore")} type="Lore" />
          <EntityButton onClick={() => setChooseEntity("Other")} type="Other" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-full h-[100%] px-5 overflow-y-auto overflow-x-hidden">
          <EntityList type={chooseEntity} />
        </div>
      )}
    </div>
  );
}
