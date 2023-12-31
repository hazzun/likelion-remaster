import React from 'react';
import ProfileImages from './ProfileImage';

export default function AskerInfo({ askerUser }) {
  return (
    <div className='w-full h-[40%] flex flex-col items-center justify-center bg-[#FFF6D6] rounded-2xl text-gray-500 gap-4'>
      {/* <div className='w-[100px] h-[100px] rounded-full bg-[#d9d9d9] flex items-center justify-center '> */}
      <ProfileImages />
      {/* </div> */}
      <p className='text-center'>
        <span className='font-bold text-lg text-black mr-1'>
          {askerUser.nickname}
        </span>
        님
        <br />
        {askerUser.age_range}대 · {askerUser.gender}
      </p>
    </div>
  );
}
