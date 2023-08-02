import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as BackButton } from "../assets/svg/back-button.svg";

export default function Header({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-5 max-w-[480px] w-full fixed top-0 h-[56px] bg-[#F9F9F9]">
      <button onClick={() => navigate(-1)}>
        <BackButton />
      </button>
      <p className="text-[1.25rem]">{title}</p>
      <div className="w-[9px]" />
    </div>
  );
}
