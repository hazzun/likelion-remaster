import React from 'react';
import { ReactComponent as Success } from '../assets/svg/success.svg';
import BottomButton from './BottomButton';
import { Link } from 'react-router-dom';

export default function HelperMeetingSuccess() {
  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      <div className='font-bold text-center text-2xl pt-8'>
        user3453님의 도움으로
        <br />
        문제를 해결했어요!
      </div>
      <Success />
      <div className='mt-4 text-xl font-semibold text-center'>
        500P
        <br />
        포인트가 지급되었습니다!
      </div>
      <div className='w-full text-[16px] font-bold gap-2 h-[50px]'>
        <Link to='/'>
          <BottomButton text='메인화면으로 돌아가기' />
        </Link>
      </div>
    </div>
  );
}
