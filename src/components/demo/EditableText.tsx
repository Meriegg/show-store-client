"use client";

import clsx from "clsx";
import DomPurify from "dompurify";
import { usePopper } from "react-popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ElementType, HTMLAttributes, useEffect, useRef, useState } from "react";

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  inputType?: "textarea" | "textinput";
  storageKey?: string;
  showOnHover?: boolean;
  allowHTML?: boolean;
}

const EditableText = ({
  as: Tag = "p",
  inputType = "textinput",
  children,
  className,
  storageKey,
  showOnHover,
  allowHTML,
  onMouseEnter,
  onMouseLeave,
  ...props
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [newContent, setNewContent] = useState<string | null>(null);
  const [loadedContent, setLoadedContent] = useState<string | null>(null);
  const [isEditing, setEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState<number | null>(null);
  const [showEditButton, setShowEditButton] = useState(false);
  const widthTrackElementRef = useRef<null | HTMLParagraphElement>(null);

  const cancelChanges = () => {
    setNewContent(null);
    setEditing(false);
  };

  const deleteChanges = () => {
    setNewContent(null);
    setLoadedContent(null);
    setEditing(false);

    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  };

  const saveChanges = () => {
    if (!newContent?.trim()) {
      cancelChanges();
      return;
    }

    if (storageKey) {
      localStorage.setItem(storageKey, newContent);
      setLoadedContent(newContent);
    }

    setEditing(false);
  };

  useEffect(() => {
    if (!widthTrackElementRef) return;

    const elementRect = widthTrackElementRef.current?.getBoundingClientRect();
    setInputWidth(elementRect?.width || null);
  }, [newContent]);

  useEffect(() => {
    setIsMounted(true);

    if (!storageKey) return;

    const val = localStorage.getItem(storageKey);
    if (!val || typeof val !== "string") return;

    setLoadedContent(val);
  }, []);

  if (!allowHTML && typeof children !== "string") {
    return <p className="text-red-500 font-semibold">ERROR: Children must be a string!</p>;
  }

  return (
    <div className="relative w-fit">
      <p
        className={clsx("absolute w-min top-0 left-0 opacity-0 -z-10", className)}
        ref={widthTrackElementRef}
      >
        {newContent}
      </p>
      <div>
        {isEditing && (
          <>
            {inputType !== "textarea" ? (
              <input
                value={newContent || ""}
                placeholder="New text!"
                onChange={(e) => setNewContent(e.target.value)}
                className={clsx("w-auto p-2 border-[1px] border-neutral-200 rounded-md", className)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    saveChanges();
                  }
                }}
                style={{
                  width: !inputWidth ? "150px" : `${inputWidth > 150 ? inputWidth : 300}px`,
                }}
              />
            ) : (
              <textarea
                value={newContent || ""}
                placeholder="New text!"
                onChange={(e) => setNewContent(e.target.value)}
                className={clsx(
                  "min-w-[350px] min-h-[25px] p-2 border-[1px] border-neutral-200 rounded-md",
                  className
                )}
              />
            )}
          </>
        )}
        {!isEditing && (
          <Tag
            className={clsx("break-words", className)}
            onMouseEnter={() => {
              setShowEditButton(true);
            }}
            onMouseLeave={() => {
              setShowEditButton(false);
            }}
            {...props}
          >
            {!allowHTML && isMounted
              ? DomPurify.sanitize((newContent || loadedContent || children) as string)
              : newContent || loadedContent || children}
          </Tag>
        )}
      </div>
      <div
        className={clsx(
          "flex items-center absolute w-auto gap-1",
          isEditing
            ? `${inputType === "textarea" ? "-bottom-8" : "-bottom-10"} left-0 z-30`
            : "-right-2 -top-2 md:right-2"
        )}
      >
        {!isEditing && (
          <button
            title="Edit content"
            onClick={() => setEditing(true)}
            onMouseEnter={() => setShowEditButton(true)}
            onMouseLeave={() => setShowEditButton(false)}
            className={clsx(
              "absolute -right-8 -top-4 bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-2 py-2 flex items-center justify-center",
              showOnHover && "opacity-0 transform translate-y-1",
              showOnHover && showEditButton && "!opacity-100 !translate-y-0"
            )}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}

        {isEditing && (
          <>
            <button
              title="Cancel changes"
              onClick={() => cancelChanges()}
              className="bg-neutral-800 transition-all duration-300 hover:bg-neutral-700 rounded-lg text-white text-xs px-3 py-2 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>

            <button
              title="Delete changes"
              onClick={() => deleteChanges()}
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
          </>
        )}
      </div>
    </div>
  );
};

export default EditableText;
