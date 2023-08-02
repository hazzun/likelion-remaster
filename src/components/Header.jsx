import React from "react";
import { ReactComponent as BackButton } from "../assets/svg/back-button.svg";

export default function Header() {
  return (
    <div className="flex justify-between items-center px-5 max-w-[480px] w-full fixed top-0 h-[56px] bg-[#F9F9F9]">
      <BackButton />
      <p className="text-black font-['Pretendard'] text-[1.25rem]">에이블</p>
      <div className="w-[9px]" />
    </div>
  );
}
