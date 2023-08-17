// 사용자가 Helper(도움제공자) 일 때 Meeting 화면입니다

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompleteButton from './CompleteButton';
import IncompleteButton from './IncompleteButton';
import AskerInfo from './AskerInfo';
import { client } from '../client';

export default function HelperMeeting({ postId, distance }) {
  const [arrived, setArrived] = useState(false);
  const [askerInfo, setAskerInfo] = useState();

  console.log(postId);
  useEffect(() => {
    client
      .get(`/selecthelper/${postId}/`)
      .then((response) => {
        console.log('짜잔 : ', response.data);
        setAskerInfo(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      {askerInfo && (
        <>
          <div className='font-bold text-center text-3xl pt-8'>
            {askerInfo.asker.nickname} 님의
            <br />
            도움을 수락했어요!
          </div>
          <AskerInfo askerUser={askerInfo.asker} />

          {!arrived ? (
            <>
              <div className='text-center'>
                <p>
                  <span className='font-bold mr-4'>도움 위치</span>
                  {askerInfo.post.building_name}
                </p>
                {/* <p>
                  <span className='font-bold mr-4'>주소</span>
                  {askerInfo.post.address}
                </p> */}
                <p>
                  <span className='font-bold mr-4'>소요 시간</span>도보 약{' '}
                  {Math.floor(distance / 67)}분
                </p>
                <p className='text-sm'>거리 {distance}m</p>
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
                <IncompleteButton props='helperFail' />
                <CompleteButton props='helperSuccess' />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
