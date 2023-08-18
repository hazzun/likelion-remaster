import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import ProfileImages from './ProfileImage';

export default function HelperInfo({ helperUser }) {
  return (
    <div className='w-[300px] h-[240px] flex flex-col items-center justify-center bg-[#FFF6D6] rounded-md text-gray-500 gap-4'>
      <ProfileImages />{' '}
      <p className='text-center'>
        <span className='font-bold text-lg text-black'>
          {helperUser.nickname}
        </span>{' '}
        님
        <br />
        <div className='flex items-center'>
          {helperUser.age_range}대 ·
          <span className='text-blue-400 ml-1'>{helperUser.gender}</span>{' '}
          {/* 별점에 해당하는 부분 백에도 있는지 확인하기 */}
          <AiFillStar className='mx-1 text-[#FE8C33]' /> {helperUser.score} (
          {helperUser.task_count})
        </div>
      </p>
    </div>
  );
}
