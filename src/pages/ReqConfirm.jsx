import React, { useState, useEffect, useMemo } from "react";
import ReactAudioPlayer from "react-audio-player";
import axios from "axios";
import CancelModal from "../components/modal/CancelModal";
import RecordIcon from "../components/icons/RecordIcon";
import TwoButton from "../components/TwoButton";

export default function ReqConfirm() {
  // 추후 로그인 검사코드 추가
  const [usertoken, setUsertoken] = useState("");

  // 백엔드에서 GET 해오는 함수
  const [mp3Url, setMp3Url] = useState("");

  // startTime 백에서 받아올 것임. 임시로 현재시간 지정
  const [startTime, setStartTime] = useState(new Date());

  // 경과시간 계산
  const getRunningTime = (date) => {
    const endTime = new Date();
    const diff = (endTime - date) / 1000;
    const times = [
      { name: "년", milliSeconds: 60 * 60 * 24 * 365 },
      { name: "개월", milliSeconds: 60 * 60 * 24 * 30 },
      { name: "일", milliSeconds: 60 * 60 * 24 },
      { name: "시간", milliSeconds: 60 * 60 },
      { name: "분", milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.name}`;
      }
    }
    return "0분";
  };

  const isoStartTime = startTime;
  const [runningTime, setRunningTime] = useState(getRunningTime(isoStartTime));

  // 경과시간 useEffect로 실시간 계산
  useEffect(() => {
    // 임시 버킷 주소
    setMp3Url(
      "https://record-upload-bucket.s3.ap-northeast-2.amazonaws.com/Christmas_Is_Coming.mp3"
    );

    const interval = setInterval(() => {
      setRunningTime(getRunningTime(isoStartTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime]);

  // audio 재생 함수
  const [start, setStart] = useState(false);
  const audio = document.querySelector("audio");

  const clickListenBtn = () => {
    if (start) {
      setStart(false);
      audio.pause();
      audio.currentTime = 0;
    } else {
      setStart(true);
      audio.play();
    }
  };

  const [modalShow, setModalShow] = useState(false);
  const clickCancel = () => {
    setModalShow(true);
  };

  return (
    <div className="h-full w-full bg-white pb-[35.04px] flex flex-col px-5">
      <div className="font-semibold text-[24px] pt-5 pb-14">작성한 내용을 확인해 주세요.</div>
      <div className="hidden">
        <ReactAudioPlayer src={mp3Url} controls />
      </div>
      <div className="flex-1">
        <div className="mb-3.5 pb-[16.93px] font-semibold text-lg text-[#797979] border-b border-[#d9d9d9]">
          내가 요청한 도움
        </div>
        <div className="mb-3.5 bg-[#FFF9E9] w-[100px] rounded-[5px] font-semibold text-2xl px-[8px] py-[4px]">
          키오스크
        </div>
        <div className="flex mb-8 font-normal text-lg">
          <div className="font-semibold mr-5">위치</div>
          <div>다이소 중앙점</div>
        </div>
        <div className="flex items-center justify-center text-center bg-[#5A5A5A] rounded-2xl mb-5">
          <button
            className="flex items-center justify-center w-full py-4 rounded-2xl bg-[#5A5A5A]"
            onClick={() => clickListenBtn()}
            id="audio"
          >
            <p className="flex items-center text-[#FFC700] text-[16px] font-medium gap-2">
              <RecordIcon size={"medium"} />
              음성내용 듣기
            </p>
          </button>
        </div>
      </div>
      <div className="">
        <p className="w-full mb-[18.96px] text-center text-[#797979] text-[12px]">
          작성한 내용이 맞다면 버튼을 눌러 도움을 요청하세요.
        </p>
        <TwoButton leftClick={clickCancel} 
                   leftText="도움 취소하기" rightText="도움 요청하기" />
      </div>
      <CancelModal
        isVisible={modalShow}
        onClose={() => setModalShow(false)}
        usertoken={usertoken}
      />
    </div>
  );
}
