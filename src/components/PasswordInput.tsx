"use client";

import Input, { type InputProps } from "./Input";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PasswordInput = ({ type, innerRight, ...props }: InputProps) => {
  const [showContent, setShowContent] = useState(false);

  return (
    <Input
      type={showContent ? type : "password"}
      innerRight={
        <button
          type="button"
          className="text-neutral-900 w-6 flex items-center justify-center px-3 py-2 hover:bg-neutral-200 rounded-md"
          onClick={() => setShowContent(!showContent)}
        >
          {showContent ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
        </button>
      }
      {...props}
    />
  );
};

export default PasswordInput;
