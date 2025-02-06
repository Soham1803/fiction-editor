import Navbar from "./app_components/Navbar";
import LeftSidebar from "./app_components/LeftSidebar";
import RightSidebar from "./app_components/RightSidebar";
import TextEditor from "./app_components/tiptap-editors/TextEditor";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between h-full w-full bg-slate-500">
      <Navbar />
      <LeftSidebar /> 
      <TextEditor />
      <RightSidebar />
    </div>
  );
}
