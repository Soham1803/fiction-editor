import Image from "next/image";
import { EntityType } from "../entity/entity-types";

interface EntityButtonProps {
    onClick: () => void;
    type: EntityType;
}

export default function EntityButton(props: EntityButtonProps) {
    return (
        <button onClick={props.onClick} className="w-full h-[18%] flex items-center justify-start gap-10 bg-primary rounded-theme py-4 px-10 hover:bg-hover-bg hover:text-primary">
            <Image className="rounded-full" src={`/nexus-button-pics/${props.type === "Item/Object" ? "Object" : props.type}.webp`} width={100} height={100} alt={props.type} />
            <span className="text-xl">{props.type}</span>
        </button>
    )
}