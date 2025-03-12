import React, { useState } from "react";
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import AddEntityList from "../entity/AddEntityList";
import AddEntity from "../entity/AddEntity";
import { EntityType } from "../entity/entity-types";

export default function SBSearch() {
  const [isEntityAdderOpen, setIsEntityAdderOpen] = useState(false);
  const [choosenEntityType, setChoosenEntityType] = useState<EntityType | "">("");
    return (

      <div className="relative h-10 w-full bg-secondary flex flex-row items-center justify-between py-1 px-2 text-text-secondary mt-secondary">
        <AddEntity setChoosenEntityType={setChoosenEntityType} entity={{type:choosenEntityType, name:"Soham Panchal", tag:["Protagonist"], aliases: ["Soham", "Panchal"], description: "Son of God!", inspiration: "God", image: "image", mentions: ["here", "there"]}} />
        <div className="flex flex-row items-center h-full w-[80%]">
          <input
            className="h-full rounded-l-theme bg-background text-xs px-2 w-[80%] focus:outline-none"
            placeholder="Search entities"
            type="search"
            name="nexus-search"
            id=""
          />
          <div className="h-full w-10 flex items-center justify-center bg-primary hover:bg-hover-bg ease-in-out duration-150">
            <AiOutlineSearch />
          </div>
          <div className="h-full w-10 flex items-center justify-center bg-primary rounded-r-theme hover:bg-hover-bg ease-in-out duration-150">
            <AiOutlineFilter />
          </div>
        </div>
        <button onClick={()=>setIsEntityAdderOpen(prev => !prev)} className="relative h-full w-8 flex items-center justify-center bg-primary rounded-theme hover:bg-hover-bg ease-in-out duration-150">
          <IoMdAdd />
          <AddEntityList setChoosenEntityType={setChoosenEntityType} open={isEntityAdderOpen} position="right-3 top-3" />
        </button>
      </div>
    )
}