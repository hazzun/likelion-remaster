import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReqConfirm() {
  
  // aws에 파일 요청

  // audio 재생 함수

  // 경과시간 계산

  // 요청 취소 POST

  return (
    <div className='w-full bg-white'>
      <div className="pt-3 pb-12 px-4 font-medium text-2xl">
          작성한 내용을 확인해 주세요.
      </div>
      <div className="px-4">
        <div className="mb-3.5 font-semibold text-lg text-[#797979]">
          내가 요청한 도움
        </div>
        <hr className="py-4"/>
        <div className="mb-3.5 bg-[#FFF9E9] w-[100px] rounded-[5px] font-semibold text-2xl px-[8px] py-[4px]">
          키오스크
        </div>
        <div className="flex mb-8 font-normal text-lg">
          <div className="font-semibold mr-5">
            위치
          </div>
          <div>다이소 중앙점</div>
        </div>
        <div className="text-center">
          <button className="mb-5 py-3.5 px-24 text-[#FFC700] bg-[#5A5A5A] text-center rounded-2xl">
            음성내용 듣기
          </button>
        </div>
      </div>
      <hr/>
      <div className="flex px-4 py-5 justify-between">
        <div className="font-medium text-base">도움 제공자가 나타날 때까지<br/>기다려 주세요!</div>
        <div className="flex flex-col justify-center bg-[#FFF6D6] px-[7px] py-[10px] rounded-xl">
          <div className="font-normal text-xs">경과 시간</div>
          <div className="flex flex-row justify-center items-baseline">
            <div className="font-semibold text-xl">00</div>
            <div className="font-normal text-xs">분</div>
          </div>
        </div>
      </div>
    </div>
  );
}