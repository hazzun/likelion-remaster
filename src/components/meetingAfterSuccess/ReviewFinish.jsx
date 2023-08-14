import React from 'react';
import { ReactComponent as Solved } from '../../assets/svg/solved.svg';
import BottomButton from '../BottomButton';
import { Link } from 'react-router-dom';

export default function ReviewFinish() {
  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      <div className='h-full flex flex-col justify-center'>
        <Solved />
        <div className='font-bold text-center text-3xl pt-8'>
          후기가 등록되었습니다!
        </div>
        <div className='mt-4 text-[#797979] text-center'>
          필요한 다른 도움들도 입력해보세요!
        </div>
      </div>
      <Link to='/' className='w-full'>
        <BottomButton text='처음으로' />
      </Link>
    </div>
  );
}
