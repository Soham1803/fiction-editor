import Navbar from "./app_components/Navbar";
import { Wrapper } from "./app_components/Wrapper";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-between h-full w-full bg-background">
      <Navbar />
      <Wrapper />
    </div>
  );
}
