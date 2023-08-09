import React from "react";
import { Link } from "react-router-dom";

export default function First() {
  return (
    <div className="flex flex-col justify-between pt-10 pb-[2.8075rem] px-5 h-full">
      <div>
        <p className="mb-3.5 heading-1">
          안녕하세요!
          <br />
          에이블입니다.
        </p>
        <p className="text-[#5C5C5C] body-1">
          실시간으로 도움요청자와 제공자가
          <br />
          만나 도움 주고 받아보세요.
        </p>
      </div>
      <div>
        <Link to="/recipient">
          <div className="flex flex-col justify-between mb-[1.5975rem] pt-[0.91rem] pb-[1.31125rem] pl-[1.275rem] gray1 rounded-[0.625rem] h-[7.65125rem] ">
            <p className="heading-2">도움요청자로 시작!</p>
            <p className="font-medium text-[0.875rem] leading-[1.095rem] text-[#5C5C5C]">
              여러운 문제들 홀로
              <br />
              고민하지 말고 도움을 받아보세요!
            </p>
          </div>
        </Link>
        <div className="flex flex-col justify-between pt-[0.91rem] pb-[1.31125rem] pl-[1.275rem] gray1 rounded-[0.625rem] h-[7.65125rem] ">
          <p className="heading-2">도움제공자로 시작!</p>
          <p className="font-medium text-[0.875rem] leading-[1.095rem] text-[#5C5C5C]">
            여러운 문제들 홀로
            <br />
            고민하지 말고 도움을 받아보세요!
          </p>
        </div>
      </div>
    </div>
  );
}
