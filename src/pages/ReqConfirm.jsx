import React, { useState, useEffect, useMemo } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import axios from 'axios';

export default function ReqConfirm() {

  // 백엔드에서 GET 해오는 함수
  const [mp3Url, setMp3Url] = useState("");

  // startTime 백에서 받아올 것임. 임시로 현재시간 지정
  const [startTime, setStartTime] = useState(new Date());

  // 경과시간 계산
  const getRunningTime = (date) => {
    const endTime = new Date();
    const diff = (endTime - date) / 1000;
    const times = [
      { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
      { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
      { name: '일', milliSeconds: 60 * 60 * 24 },
      { name: '시간', milliSeconds: 60 * 60 },
      { name: '분', milliSeconds: 60 },
    ];
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
      if (betweenTime > 0) {
        return `${betweenTime}${value.name}`;
      }
    }
    return '00';
  }

  const isoStartTime = startTime
  const [runningTime, setRunningTime] = useState(getRunningTime(isoStartTime));

  // 경과시간 useEffect로 실시간 계산
  useEffect(() => {
    // 임시 버킷 주소
    setMp3Url("https://record-upload-bucket.s3.ap-northeast-2.amazonaws.com/Christmas_Is_Coming.mp3");
    
    const interval = setInterval(() => {
      setRunningTime(getRunningTime(isoStartTime));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime]);
  
  // audio 재생 함수
  const [start, setStart] = useState(false);
  const audio = document.querySelector('audio');

  const clickListenBtn = () => {
    if(start) {
      setStart(false);
      audio.pause();
      audio.currentTime = 0
    }
    else {
      setStart(true);
      audio.play();
    }
  }
  
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
          <button className="mb-5 py-3.5 px-24 text-[#FFC700] bg-[#5A5A5A] text-center rounded-2xl"
                  onClick={() => clickListenBtn()}
                  id="audio">
            음성내용 듣기
          </button>
        </div>
      </div>
      <div className="hidden">
        <ReactAudioPlayer
          src={mp3Url}
          controls
        />
      </div>
      <hr/>
      <div className="flex px-4 py-5 justify-between">
        <div className="font-medium text-base">도움 제공자가 나타날 때까지<br/>기다려 주세요!</div>
        <div className="flex flex-col justify-center bg-[#FFF6D6] px-[7px] py-[10px] rounded-xl">
          <div className="font-normal text-xs">경과 시간</div>
          <div className="flex flex-row justify-center items-baseline">
            <div className="font-semibold text-xl">{runningTime}</div>
            {/*<div className="font-normal text-xs">분</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}