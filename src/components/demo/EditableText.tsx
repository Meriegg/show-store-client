"use client";

import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { ElementType, HTMLAttributes, useEffect, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  storageKey?: string;
}

const EditableText = ({ as: Tag = "p", children, className, storageKey, ...props }: Props) => {
  const [newContent, setNewContent] = useState<string | null>(null);
  const [isEditing, setEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const widthTrackElementRef = useRef<null | HTMLParagraphElement>(null);

  const cancelChanges = () => {
    setNewContent(null);
    setEditing(false);
  };

  const saveChanges = () => {
    if (!newContent?.trim()) {
      cancelChanges();
      return;
    }

    if (storageKey) {
      localStorage.setItem(storageKey, newContent);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (!widthTrackElementRef) return;

    const elementRect = widthTrackElementRef.current?.getBoundingClientRect();
    console.log(elementRect);
    setInputWidth(elementRect?.width || null);
  }, [newContent]);

  useEffect(() => {
    if (!storageKey) return;

    const val = localStorage.getItem(storageKey);
    if (!val || typeof val !== "string") return;

    setNewContent(val);
  }, []);

  if (typeof children !== "string") {
    return <p>Children must be a string!</p>;
  }

  return (
    <div className="relative w-fit">
      <p
        className={clsx("absolute w-min top-0 left-0 opacity-0 -z-10", className)}
        ref={widthTrackElementRef}
      >
        {newContent}
      </p>
      {isEditing && (
        <input
          value={newContent || ""}
          placeholder="New value!"
          onChange={(e) => setNewContent(e.target.value)}
          className={clsx("w-auto", className)}
          style={{
            width: !inputWidth ? "150px" : `${inputWidth > 150 ? inputWidth : 300}px`,
          }}
        />
      )}
      {!isEditing && (
        <Tag className={className} {...props}>
          {newContent || children}
        </Tag>
      )}
      {!isEditing && (
        <button
          title="Edit content"
          onClick={() => setEditing(true)}
          className="absolute -right-8 -top-4 bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-2 py-2 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
      )}
      {isEditing && (
        <div className="flex items-center gap-2 absolute -right-20 -top-4">
          <button
            title="Delete changes"
            onClick={() => cancelChanges()}
            className="bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-3 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>

          <button
            title="Save changes"
            onClick={() => saveChanges()}
            className="bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-2.5 py-2 flex items-center justify-center"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableText;
