import React from 'react';
import { ReactComponent as Fail } from '../assets/svg/fail.svg';
import BottomButton from './BottomButton';
import { Link } from 'react-router-dom';

export default function HelperMeetingFail() {
  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      <div className='font-bold text-center text-2xl pt-8'>
        문제를 해결하지 못 했어요!
      </div>
      <Fail />
      <div className='mt-4 text-xl font-semibold text-center'>
        다음 기회엔
        <br />
        해결할 수 있을 거예요!
      </div>
      <div className='w-full text-[16px] font-bold gap-2 h-[50px]'>
        <Link to='/'>
          <BottomButton text='처음으로' />
        </Link>
      </div>
    </div>
  );
}
