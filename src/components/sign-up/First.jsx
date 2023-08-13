import React from "react";
import { Link } from "react-router-dom";

export default function First({ next }) {
  return (
    <div className="flex flex-col justify-between pt-10 pb-[2.8075rem] h-full">
      <div>
        <p className="heading-1">안녕하세요!</p>
        <div className="flex mb-3.5">
          <p className="font-[ImcreSoojin] text-[2rem] leading-[2.625rem] color-yellow mr-[0.25rem]">
            와봐유
          </p>
          <p className="heading-1">입니다.</p>
        </div>
        <p className="text-[#5C5C5C] body-1">
          실시간으로 도움요청자와 제공자가
          <br />
          만나 도움 주고 받아보세요.
        </p>
      </div>
      <div>
        <button className="w-full text-left" onClick={next}>
          <div className="flex flex-col justify-between mb-[1.5975rem] pt-[0.91rem] pb-[1.31125rem] pl-[1.275rem] yellow rounded-[0.625rem] h-[7.65125rem]">
            <p className="heading-2">도움요청자로 시작!</p>
            <p className="font-medium text-[0.875rem] leading-[1.095rem] text-[#5C5C5C]">
              여러운 문제들 홀로
              <br />
              고민하지 말고 도움을 받아보세요!
            </p>
          </div>
        </button>
        <button className="w-full text-left" onClick={next}>
          <div className="flex flex-col justify-between pt-[0.91rem] pb-[1.31125rem] pl-[1.275rem] gray1 rounded-[0.625rem] h-[7.65125rem] ">
            <p className="heading-2">도움제공자로 시작!</p>
            <p className="font-medium text-[0.875rem] leading-[1.095rem] text-[#5C5C5C]">
              도움을 주고
              <br />
              포인트와 성취감을 얻어요!
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
