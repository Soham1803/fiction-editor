// import Image from "next/image";


export default function EntityCard(props: { name: string, role: string}) {
    return (
        <button className="w-48 h-48 flex flex-col items-center justify-start gap-4 bg-primary rounded-theme py-4 px-10 hover:bg-hover-bg hover:text-primary">
            <div className="rounded-full w-24 h-24 bg-secondary" />
            <span className="text-xl">{props.name}</span>
        </button>
    )
}