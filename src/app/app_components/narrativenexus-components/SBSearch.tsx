
import { AiOutlineFilter, AiOutlineSearch } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

export default function SBSearch() {
    return (

      <div className="h-10 w-full bg-secondary flex flex-row items-center justify-between py-1 px-2 text-text-secondary mt-secondary">
        <div className="flex flex-row items-center h-full w-[80%]">
          <input
            className="h-full rounded-l-theme bg-background text-xs px-2 w-[80%] focus:outline-none"
            placeholder="Search entities"
            type="text"
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
        <div className="h-full w-8 flex items-center justify-center bg-primary rounded-theme hover:bg-hover-bg ease-in-out duration-150">
          <IoMdAdd />
        </div>
      </div>
    )
}