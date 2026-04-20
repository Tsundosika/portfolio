"use client";

import { useRef, useState } from "react";

type Props = {
  onFileSelect: (file: File) => void;
  preview: string | null;
};

export function DropZone({ onFileSelect, preview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function applyFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    if (inputRef.current) inputRef.current.files = dt.files;
    onFileSelect(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) applyFile(file);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) applyFile(file);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`cursor-pointer border-2 border-dashed rounded-tl rounded-tr-lg rounded-br rounded-bl-lg min-h-40 flex items-center justify-center transition-colors duration-200 ${
        isDragging
          ? "border-forest bg-forest/5"
          : "border-ink/30 hover:border-forest/60 bg-parchment-dark/30"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        name="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />
      {preview ? (
        <img
          src={preview}
          alt="Preview"
          className="max-h-52 max-w-full object-contain rounded py-2"
        />
      ) : (
        <div className="text-center px-6 py-8">
          <p className="text-ink/50 text-xl">Drop image here</p>
          <p className="text-ink/35 text-lg mt-1">or click to browse</p>
        </div>
      )}
    </div>
  );
}
