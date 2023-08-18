import React from "react";
import LoadingIcon from "./icons/LoadingIcon";

export default function ConfirmLoading({ text }) {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center text-center gap-8">
        <LoadingIcon size="large" />
        <p className="text-md text-gray-500">{text}</p>
      </div>
    </>
  );
}
