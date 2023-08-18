import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HelperInfo from './HelperInfo';
import TwoButton from './TwoButton';
import CancelModal from '../components/modal/CancelModal';
import ReRequestModal from '../components/modal/ReRequestModal';
import { client } from '../client';
import IncompleteButton from './IncompleteButton';
import CompleteButton from './CompleteButton';

export default function AskerMeeting({ postId }) {
  // const location = useLocation();
  console.log('postId : ', postId);
  const [helperMatch, setHelperMatch] = useState(false);
  const [handleAccept, setHandleAccept] = useState();
  const [arrived, setArrived] = useState(false);
  const [helperReset, setHelperReset] = useState(false);
  const [distance, setDistance] = useState();

  // 백에서 받아온 요청시간 저장하기
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
        console.log('betweenTime = ', betweenTime);
        return `${betweenTime}${value.name}`;
      }
    }
    return '0분';
  };

  const isoStartTime = startTime;
  const [runningTime, setRunningTime] = useState(getRunningTime(isoStartTime));

  // 경과시간 useEffect로 실시간 계산
  useEffect(() => {
    console.log('리랜더링됨 ㅋㅋ');
    const interval = setInterval(() => {
      setRunningTime(getRunningTime(isoStartTime));

      client
        .get(`/reqconfirm/${postId}/`)
        .then((response) => {
          // console.log(response.data);
          if (response.data.helper) {
            acceptHelper(response.data.id);
            setHelperMatch(true);
            clearInterval(interval);
          }
        })
        .catch((error) => console.log('그만 : ', error));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isoStartTime, helperReset]);

  const acceptHelper = (postIndex) => {
    client
      .get(`/meeting/${postIndex}/`)
      .then((response) => {
        console.log(response.data);
        setDistance(
          haversineDistance(
            response.data.helper.user_latitude,
            response.data.helper.user_longtitude,
            response.data.post.location_latitude,
            response.data.post.location_longtitude
          )
        );
        setHandleAccept(response.data);
      })
      .catch((error) => console.log(error));
  };

  const [modalShow, setModalShow] = useState(false);
  const clickCancel = () => {
    setModalShow(true);
  };
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  function haversineDistance(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371000; // 지구 반지름 (미터)

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance;
  }

  return (
    <div className='h-full flex flex-col items-center justify-between pt-[52.87px] px-[20px] pb-[37.19px]'>
      {helperMatch && handleAccept ? (
        <>
          <div className='h-full flex flex-col items-center justify-between'>
            <div className='mb-[33.49px] font-bold text-center heading-2'>
              {handleAccept.helper.nickname} 님이
              <br />
              도움을 수락했어요!
            </div>
            <HelperInfo helperUser={handleAccept.helper} />
            {!arrived ? (
              <>
                <div className='text-center'>
                  <p>
                    <span className='font-bold mr-4'>도움 위치</span>
                    {handleAccept.post.building_name}
                  </p>
                  {/* <p>
                  <span className='font-bold mr-4'>주소</span>
                  {askerInfo.post.address}
                </p> */}
                  <p>
                    <span className='font-bold mr-4'>소요 시간</span>도보 약{' '}
                    {Math.floor(distance / 67)}분
                  </p>
                  <p className='text-sm'>
                    <span className='font-bold mr-4'>거리</span> 약{' '}
                    {Math.floor(distance)}m
                  </p>
                  <p className='mt-4 text-xl font-semibold'>
                    만남을 가진 뒤<br /> 도착버튼을 눌러주세요!
                  </p>
                </div>
                <button
                  className='w-full h-[3.25rem] rounded-2xl bg-[#FFC700]'
                  onClick={() => setArrived(true)}
                >
                  <p className='text-[1.25rem] font-medium'>도착</p>
                </button>
              </>
            ) : (
              <>
                <div className='mt-4 text-xl font-semibold text-center'>
                  해결을 완료한 뒤<br />
                  아래 버튼을 클릭해주세요!
                </div>
                <div className='w-full grid grid-cols-2 text-[16px] font-bold gap-2 h-[50px]'>
                  <IncompleteButton
                    props='asker'
                    isHelp={false}
                    postId={postId}
                    setHelperReset={setHelperReset}
                  />
                  <CompleteButton props='asker' postId={postId} />
                </div>
              </>
            )}
          </div>
          {/* <TwoButton
            leftClick={clickCancel}
            leftText='도움을 주지 못했어요'
            rightText='해결완료'
          /> */}
          <ReRequestModal
            isVisible={modalShow}
            onClose={() => setModalShow(false)}
          />
        </>
      ) : (
        <div className='h-full w-full bg-white pb-[35.04px] flex flex-col px-5'>
          <div className='font-semibold text-[24px] pt-5 pb-[80px] text-center'>
            도움 제공자가 나타날 때까지
            <br /> 기다려 주세요 !
          </div>
          <div className='font-semibold text-[18px] text-center pb-[12px]'>
            경과 시간
          </div>
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
