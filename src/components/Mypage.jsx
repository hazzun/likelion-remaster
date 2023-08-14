import { useState, useEffect } from "react";
import { ReactComponent as User } from "../assets/svg/user.svg";
import { ReactComponent as UserImg } from "../assets/svg/user-img.svg";
import { ReactComponent as Star } from "../assets/svg/star.svg";
import { ReactComponent as Close } from "../assets/svg/close.svg";

export default function Mypage({ close }) {
  const comment = ["친철해요", "설명이 쉬워요", "빨라요", "인내심이 깊어요"];
  return (
    <>
      <div
        id="mypage-container"
        className="absolute z-[51] top-0 mt-[-56px] w-full h-full bg-black bg-opacity-40 overflow-hidden"
      >
        <div
          id="mypage-banner"
          className="overflow-y-auto h-full w-[80%] px-[1rem] bg-white absolute right-0 animate-slideInFromRight"
        >
          <div className="mt-[34px] flex justify-between items-center pr-[4px]">
            <div className="flex items-center">
              <User />
              <p className="ml-[7.79px] font-medium text-[24px]">마이페이지</p>
            </div>
            <button onClick={close}>
              <Close />
            </button>
          </div>
          <div className="flex h-[20.3%] items-center border-b border-[#D9D9D9]">
            <UserImg />
            <div className="ml-[20.11px]">
              <p className="font-semibold color-orange text-[14px]">
                도움 제공자
              </p>
              <span className="font-bold text-[1.5rem]">{"user5678 "}</span>
              <span className="text-[1.5rem] color-gray3">님</span>
              <p className="mt-[-4px]" />
              <span className="text-[18px] color-gray3">{"20대 · "}</span>
              <span className="text-[18px] text-[#3DA2FF]">남성</span>
            </div>
          </div>
          <div className="h-[11.9%] flex items-center border-b border-[#D9D9D9]">
            <p className="heading-2 mr-[75.07px]">포인트</p>
            <div className="flex items-end">
              <p className="heading-2 font-medium text-[20px]">{"500 "}</p>
              <p className="heading-2 text-[18px] color-gray3">p</p>
            </div>
          </div>
          <div className="h-[57.3%] pt-[30.74px] mb-[30px]">
            <div className="mb-[30px]">
              <span className="heading-2 mr-[49.07px]">도움 횟수</span>
              <span className="heading-2 font-medium text-[20px]">{"1 "}</span>
              <span className="heading-2 text-[18px] color-gray3">회</span>
            </div>
            <p className="heading-2 mb-[22px]">도움 후기</p>
            <div className="flex items-center mb-[22px]">
              <p className="mr-[18px] text-[18px]">평점</p>
              <Star />
              <p className="ml-[5.26px] title">4.0</p>
              <p className="ml-[5.26px] title text-[#6d6d6d]">(1)</p>
            </div>
            <p className="mb-[11px] text-[18px]">코멘트</p>
            <div className="flex flex-col gap-[7.23px]">
              {comment.map((item) => {
                return (
                  <div className="mb-[7.23px]">
                    <div className="py-[0.5rem] px-[12px] inline-block rounded-[5px] bg-[#FFF6D6]">
                      <span className="mr-[10px] text-[#5c5c5c] text-[14px]">
                        {item}
                      </span>
                      <span className="text-[14px] text-[#FF7F00]">1</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
