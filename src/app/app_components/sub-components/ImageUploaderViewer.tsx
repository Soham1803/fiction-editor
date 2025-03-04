import Image from "next/image";
import { useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";

export default function ImageUploaderViewer() {
  const [image, setImage] = useState<string | null>(null);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);  
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {image ? (
        <div className="flex flex-col items-center w-full h-full relative">
          <div className="w-36 h-36 relative">
            <Image
              src={image}
              fill
              alt="uploaded"
              className="object-cover rounded-theme"
              sizes="200px"
            />
          </div>
          <div className="flex flex-row gap-2 mt-2">
            <button
              onClick={() => setImage(null)}
              className="flex-1 bg-primary text-sm text-text-secondary rounded-md p-1 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <input onChange={handleFileInput} type="file" name="file" id="file" className="hidden" />
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center w-40 h-40 bg-primary rounded-theme hover:bg-hover-bg ease-in-out duration-150"
          >
            <p className="flex flex-col items-center text-text-secondary ">
              <span className="text-lg">
                <AiOutlineUpload />
              </span>
              <span className="text-sm">Upload Image</span>
            </p>
          </label>
        </div>
      )}
    </div>
  );
}
