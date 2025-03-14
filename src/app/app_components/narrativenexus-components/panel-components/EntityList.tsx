import { cn } from "@/utils/class-join";
import EntityCard from "../entity/EntityCard";
import { useState } from "react";
// import AddEntity from "../entity/AddEntity";
import { EntityType } from "../entity/entity-types";
import CharacterChat from "./CharacterChat";

interface Character {
  name: string,
  role: string,
  image: string,
}

export default function EntityList(props: {
  type: string;
  setChooseEntity: React.Dispatch<React.SetStateAction<EntityType | "">>;
}) {
  const [entityChosen, setEntityChosen] = useState< Character | "">("");

  const characters: Character[] = [
    {
      name: "John",
      role: "Protagonist",
      image: "image",
    },
    {
      name: "Jane",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jack",
      role: "Antagonist",
      image: "image",
    },
    {
      name: "Jill",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Julias",
      role: "Protagonist",
      image: "image",
    },
    {
      name: "Jenny",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jasper",
      role: "Antagonist",
      image: "image",
    },
    {
      name: "Jasmine",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jude",
      role: "Protagonist",
      image: "image",
    },
    {
      name: "Jade",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jared",
      role: "Antagonist",
      image: "image",
    },
    {
      name: "Jocelyn",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jasper",
      role: "Protagonist",
      image: "image",
    },
    {
      name: "Jenny",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jasper",
      role: "Antagonist",
      image: "image",
    },
    {
      name: "Jasmine",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jude",
      role: "Protagonist",
      image: "image",
    },
    {
      name: "Jade",
      role: "Side Character",
      image: "image",
    },
    {
      name: "Jared",
      role: "Antagonist",
      image: "image",
    },
    {
      name: "Jocelyn",
      role: "Side Character",
      image: "image",
    },
  ];

  return (
    <div className="w-full h-[93%] py-1 px-1">
      {entityChosen === "" ? (
        <div className="flex flex-wrap gap-x-2 gap-y-2 w-full max-h-[93%] px-5 overflow-y-auto overflow-x-hidden">
          <div className="w-full text-left p-4">
            <h4 className={cn()}>{props.type}s</h4>
            <h4 className="italic">Here are all of your {props.type}s!</h4>
          </div>
          {characters.map((character, index) => (
            <div
              onClick={() => setEntityChosen(character)}
              key={index}
              className="flex-shrink-0"
            >
              <EntityCard
                name={character.name}
                role={character.role}
                image={character.image}
              />
            </div>
          ))}
        </div>
      ) : props.type === "Character" && (
        <CharacterChat character={entityChosen} />
      )}
    </div>
  );
}
