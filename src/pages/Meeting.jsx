import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CompleteButton from '../components/CompleteButton';
import IncompleteButton from '../components/IncompleteButton';
import HelperInfo from '../components/HelperInfo';
import AskerInfo from '../components/AskerInfo';

export default function Meeting() {
  const [arrived, setArrived] = useState(false);

  let username = 'user0123';
  let askerUser = {
    username: 'user9876',
    age: '50대',
    gender: '남성',
  };

  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      <div className='font-bold text-center text-3xl pt-8'>
        {username} 님의
        <br />
        도움을 수락했어요!
      </div>
      <AskerInfo askerUser={askerUser} />
      {!arrived ? (
        <>
          <div className='text-center'>
            <p>
              <span className='font-bold mr-4'>도움 위치</span>다이소 중앙점
            </p>
            <p>
              <span className='font-bold mr-4'>소요 시간</span>도보 약 10~15
            </p>
            <p className='text-sm'>거리 0.8km</p>
            <p className='mt-4 text-2xl font-semibold'>
              지금 찾아가는 중이예요!
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
          <div className='text-center'>
            해결을 완료한 뒤<br />
            아래 버튼을 클릭해주세요!
          </div>
          <div className='w-full grid grid-cols-2 text-[16px] font-bold gap-4 h-[50px]'>
            <IncompleteButton />
            <CompleteButton />
          </div>
        </>
      )}
    </div>
  );
}
