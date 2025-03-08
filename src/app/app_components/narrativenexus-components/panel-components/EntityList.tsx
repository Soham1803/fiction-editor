import { cn } from "@/utils/class-join"
import EntityCard from "../entity/EntityCard"


export default function EntityList(props: { type: string }) {

    const characters = [
        {
            name: "John",
            role: "Protagonist",
            image: "image"
        },
        {
            name: "Jane",
            role: "Side Character",
            image: "image"
        },
        {
            name: "Jack",
            role: "Antagonist",
            image: "image"
        },
        {
            name: "Jill",
            role: "Side Character",
            image: "image"
        },
        {
            name: "Julias",
            role: "Protagonist",
            image: "image"
        },
        {
            name: "Jenny",
            role: "Side Character",
            image: "image"
        },
        {
            name: "Jasper",
            role: "Antagonist",
            image: "image"
        },
        {
            name: "Jasmine",
            role: "Side Character",
            image: "image"
        }
    ]

    return (
        <div className="w-full h-[93%] py-2 px-1">
            <div className="w-full text-left p-4">
                <h4 className={cn()}>
                    {props.type}s
                </h4>
                <h4 className="italic" >Here are all of your {props.type}s!</h4>
            </div>

            <div className="flex flex-wrap gap-x-2 gap-y-2 w-full max-h-full px-5 overflow-y-auto overflow-x-hidden">
                {characters.map((character, index) => (
                    <div key={index} className="flex-shrink-0">
                      <EntityCard name={character.name} role={character.role} image={character.image} />
                    </div>
                ))}
            </div>
        </div>
    )
}