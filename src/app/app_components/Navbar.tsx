import ThemeSetter from "./settings-components/ThemeSetter";

export default function Navbar() {
    return (
        <div className="absolute top-0 left-0 flex flex-row items-center justify-between px-5 h-6 text-xs w-full bg-primary text-text-secondary">
            <div className="flex flex-row w-[20%] items-center justify-evenly" >
                <ThemeSetter />
            </div>
            <div className="flex flex-row w-[20%] items-center justify-evenly text-sm">
                <button className="w-[30%] hover:font-semibold" >Prompts</button>
                <button className="w-[30%] hover:font-semibold" >Format</button>
                <button className="w-[30%] hover:font-semibold" >Export</button>
            </div>
        </div>
    )
}