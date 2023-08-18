import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HelperInfo from "./HelperInfo";
import TwoButton from "./TwoButton";
import CancelModal from "../components/modal/CancelModal";
import ReRequestModal from "../components/modal/ReRequestModal";
import { client } from '../client';

export default function AskerMeeting() {
  const [arrived, setArrived] = useState(false);

  // 백에서 받아온 요청시간 저장하기
  const [startTime, setStartTime] = useState(new Date());

  // post id 알 수가 없음...
  // let res = client.get(process.env.REACT_APP_BASE_URL+"요청내용GET/", {
  //   params: {
      
  //   },
  // });
  // console.log("===GET 결과===")
  // console.log(res.data)
  // startTime에 res.data중 date값 저장
  // setStartTime()

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
    const interval = setInterval(() => {
      setRunningTime(getRunningTime(isoStartTime));
    }, 1000);

    // 이것도 post id 모름...
    // let res = client.get(process.env.REACT_APP_BASE_URL+"요청상태확인-GET-PATH/", {
    //   params: {
        
    //   },
    // });
    // console.log("===GET 결과===")
    // let datajson = res.data;
    // console.log(datajson)
    // 만약에 res 가 뭐 바뀌는 경우,,
    //setArrived(true)

    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime]);

  const [modalShow, setModalShow] = useState(false);
  const clickCancel = () => {
    setModalShow(true);
  };

  let helperUser = {
    username: "user1234",
    age: "20대",
    gender: "여성",
    rating: 4.5,
    ratingCount: 9,
  };

  return (
    <div className="h-full flex flex-col items-center justify-between pt-[52.87px] px-[20px] pb-[37.19px]">
      { arrived ? (
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
              <p>
                <span className="font-bold mr-4">거리</span>0.8km
              </p>
              <p className="mt-4 text-2xl font-semibold"></p>
            </div>
          </div>
          <TwoButton leftClick={clickCancel} leftText="도움을 주지 못했어요" 
                     rightText="해결완료" />
          <ReRequestModal
            isVisible={modalShow}
            onClose={() => setModalShow(false)}
          />
        </>
      ) : (
        <div className="h-full w-full bg-white pb-[35.04px] flex flex-col px-5">
          <div className="font-semibold text-[24px] pt-5 pb-[80px] text-center"> 
            도움 제공자가 나타날 때까지<br/> 기다려 주세요 !
          </div>
          <div className='font-semibold text-[18px] text-center pb-[12px]'>경과 시간</div>
          <div className='flex flex-col justify-center bg-[#FFF6D6] h-[61px] rounded-xl mb-[100px]'>
            <div className='flex flex-row justify-center items-baseline'>
              <div className='font-semibold text-[24px]'>{runningTime}</div>
            </div>
          </div>
          <div className='text-center '>
            <button
              onClick={clickCancel}
              className='w-[175px] h-[40px] rounded-xl font-medium text-[16px] border-[#181717] border-[1px]'
            >
              요청 취소하기
            </button>
            <div className='pt-3 font-normal text-[12px] color-[#797979]'>
              요청한 도움을 취소하고 싶나요?
              <br />위 버튼을 눌러 초기화면으로 돌아갈 수 있어요
            </div>
          </div>
          <CancelModal
            isVisible={modalShow}
            onClose={() => setModalShow(false)}
          />
        </div>
      )}
    </div>
  );
}
