import React from 'react';
import { AiFillStar } from 'react-icons/ai';

export default function HelperInfo({ helperUser }) {
  return (
    <div className='w-full h-[40%] flex flex-col items-center justify-center bg-[#FFF6D6] rounded-2xl text-gray-500 gap-4'>
      <div className='w-[100px] h-[100px] rounded-full bg-[#d9d9d9] flex items-center justify-center '></div>
      <p className='text-center'>
        <span className='font-bold text-lg text-black'>
          {helperUser.username}
        </span>{' '}
        님
        <br />
        <div className='flex items-center'>
          {helperUser.ageg} ·{' '}
          <span className='text-blue-400'>{helperUser.gender}</span>{' '}
          {/* 별점에 해당하는 부분 백에도 있는지 확인하기 */}
          <AiFillStar className='mx-1 text-[#FE8C33]' /> 4.0 (1)
        </div>
      </p>
    </div>
  );
}
