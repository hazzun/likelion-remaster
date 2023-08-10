import React from 'react';
import logo from '../assets/logo.png';
import title from '../assets/title.png';
import splashTop from '../assets/splashTop.png';
import splashBottom from '../assets/splashBottom.png';

export default function Splash() {
  return (
    <div>
      <img
        src={splashTop}
        alt='둥근 위쪽 원'
        className='w-[50%] fixed top-0 right-0'
      />
      <div className='h-screen flex flex-col items-center justify-center'>
        <div className='flex gap-2 items-center'>
          <img
            src={logo}
            alt='Logo'
            className='w-[80px] h-[80px] animate-waving'
          />
          <img src={title} alt='와봐유' className='w-[150px] h-[56px]' />
        </div>
        <p className='text-[#5C5C5C] mt-4'>도움을 품앗이해요</p>
      </div>
      <img
        src={splashBottom}
        alt='둥근 아래쪽 원'
        className='w-[50%] fixed bottom-0 left-0'
      />
    </div>
  );
}
