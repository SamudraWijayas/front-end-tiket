"use client";

import { cn } from "@/utils/cn";
import { UploadCloud, X } from "lucide-react";
import { useState, DragEvent } from "react";
import Image from "next/image";

interface PropsTypes {
  name: string;
  className?: string;
  onFileSelect?: (file: File) => void;
}

const InputFile = ({ name, className, onFileSelect }: PropsTypes) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const truncateFileName = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    const ext = filename.split(".").pop();
    return (
      filename.slice(0, maxLength - (ext?.length ?? 0) - 3) + "... ." + ext
    );
  };

  const handleFileChange = (file?: File) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFileName(file.name);
      onFileSelect?.(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <label
      htmlFor="dropzone-file"
      className={cn(
        "flex min-h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition hover:bg-gray-100",
        isDragging && "border-blue-500 bg-blue-50",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setIsDragging(false);
      }}
      onDrop={handleDrop}
    >
      {preview ? (
        <div className="relative flex flex-col items-center">
          <Image
            src={preview}
            alt="Preview"
            width={112}
            height={112}
            className="rounded-lg object-cover shadow"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setPreview(null);
              setFileName("");
            }}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
          >
            <X size={14} />
          </button>
          <p className="mt-2 max-w-[200px] truncate text-xs text-gray-500">
            {truncateFileName(fileName)}
          </p>
        </div>
      ) : (
        <>
          <UploadCloud className="mb-2 h-8 w-8 text-gray-500" />
          <p className="text-sm text-gray-500">
            <span className="font-medium text-blue-600">Klik untuk upload</span>{" "}
            atau seret file ke sini
          </p>
        </>
      )}

      <input
        type="file"
        id="dropzone-file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </label>
  );
};

export default InputFile;
