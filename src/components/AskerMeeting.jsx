// 사용자가 Asker (도움요청자) 일 때 Meeting 화면입니다

import React, { useState } from "react";
import { Link } from "react-router-dom";
import CompleteButton from "./CompleteButton";
import IncompleteButton from "./IncompleteButton";
import HelperInfo from "./HelperInfo";
import TwoButton from "./TwoButton";

export default function AskerMeeting() {
  const [arrived, setArrived] = useState(false);

  let helperUser = {
    username: "user1234",
    age: "20대",
    gender: "여성",
    rating: 4.5,
    ratingCount: 9,
  };

  return (
    <div className="h-full flex flex-col items-center justify-between pt-[52.87px] px-[20px] pb-[37.19px]">
      {!arrived ? (
        <>
          <div>
            <div className="mb-[33.49px] font-bold text-center heading-2">
              {helperUser.username} 님이
              <br />
              도움을 수락했어요!
            </div>
            <HelperInfo helperUser={helperUser} />
            <div className="mt-[18.23px] text-center">
              <p>
                <span className="font-bold mr-4">도움 위치</span>다이소 중앙점
              </p>
              <p>
                <span className="font-bold mr-4">소요 시간</span>도보 약{" "}
                <span className="font-bold">10~15</span> 분
              </p>
              <p className="text-sm">거리 0.8km</p>
              <p className="mt-4 text-2xl font-semibold"></p>
            </div>
          </div>
          <TwoButton leftText="도움을 주지 못했어요" rightText="해결완료" />
        </>
      ) : (
        <>
          {/* <div className="font-bold text-center text-3xl pt-8">
            {helperUser.username} 님의
            <br />
            해결이 도움되었나요?
          </div>
          <HelperInfo helperUser={helperUser} />
          <div className="mt-4 text-xl font-semibold text-center">
            해결을 완료한 뒤<br />
            아래 버튼을 눌러주세요!
          </div>
          <div className="w-full grid grid-cols-2 text-[16px] font-bold gap-2 h-[50px]">
            <IncompleteButton
              props="askerFail"
              asker="도움을 받지 못했어요"
              isHelp={false}
            />
            <CompleteButton props="askerSuccess" />
          </div> */}
        </>
      )}
    </div>
  );
}
