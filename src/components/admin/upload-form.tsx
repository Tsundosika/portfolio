"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { uploadArtwork } from "@/app/actions/gallery";
import { DropZone } from "./drop-zone";

const mediums = ["Watercolor", "Digital Art", "Ink & Pen", "Mixed Media", "Graphite", "Gouache", "Other"];

export function UploadForm() {
  const [state, action, isPending] = useActionState(uploadArtwork, null);
  const [preview, setPreview] = useState<string | null>(null);
  const [hasFile, setHasFile] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      setPreview(null);
      setHasFile(false);
      router.refresh();
    }
  }, [state, router]);

  function handleFileSelect(file: File) {
    setHasFile(true);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <form ref={formRef} action={action} className="flex flex-col gap-5">
      <DropZone onFileSelect={handleFileSelect} preview={preview} />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-lg font-semibold text-ink">Title *</label>
          <input
            id="title" name="title" required
            className="px-4 py-2.5 text-xl bg-parchment-light border-2 border-ink/35 focus:border-forest focus:outline-none rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] transition-colors"
            placeholder="Artwork title"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="medium" className="text-lg font-semibold text-ink">Medium *</label>
          <select
            id="medium" name="medium" required
            className="px-4 py-2.5 text-xl bg-parchment-light border-2 border-ink/35 focus:border-forest focus:outline-none rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] transition-colors cursor-pointer"
          >
            <option value="">Select medium</option>
            {mediums.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="description" className="text-lg font-semibold text-ink">Description</label>
        <textarea
          id="description" name="description" rows={2}
          className="px-4 py-2.5 text-xl bg-parchment-light border-2 border-ink/35 focus:border-forest focus:outline-none rounded-tl rounded-tr-[5px] rounded-br-sm rounded-bl-[5px] transition-colors resize-none"
          placeholder="Optional notes about this piece"
        />
      </div>

      {state?.error && <p className="text-terracotta text-lg font-medium">{state.error}</p>}
      {state?.success && <p className="text-forest text-lg font-medium">Artwork added to gallery!</p>}

      <button
        type="submit" disabled={isPending || !hasFile}
        className="self-start px-8 py-3 text-xl font-semibold bg-forest text-parchment-light rounded-tl-sm rounded-tr-lg rounded-br rounded-bl-xl hover:bg-forest-light disabled:opacity-50 transition-colors duration-200 shadow-[3px_3px_0_0_rgba(30,19,10,0.18)]"
      >
        {isPending ? "Uploading…" : "Add to Gallery"}
      </button>
    </form>
  );
}
