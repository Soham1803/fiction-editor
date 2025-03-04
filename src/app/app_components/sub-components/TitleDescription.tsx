import { cn } from "@/utils/class-join";

export default function TitleDescription(props: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={cn(props.className , "flex flex-col w-full")}>
      <label htmlFor="description" className="p-1">
        {props.title}
      </label>
      <label className="text-xs px-1" htmlFor="description">
        {props.description}
      </label>
    </div>
  );
}
