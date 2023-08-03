import React from "react";

export default function CategoryBox({ text, click, check }) {
  return (
    <button onClick={click}>
      <div
        className={`flex justify-center items-center h-[2.375rem] rounded-3xl ${
          check
            ? "bg-[#CACACA]"
            : "border border-solid	border-[#D9D9D9] text-[#D9D9D9]"
        }`}
      >
        <p>{text}</p>
      </div>
    </button>
  );
}
