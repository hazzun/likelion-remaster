import React from 'react';
import logo from '../assets/logo.png';
import title from '../assets/title.png';
import splashTop from '../assets/splashTop.png';
import splashBottom from '../assets/splashBottom.png';

export default function Splash() {
  return (
    <div className="h-full flex flex-col">
      <div>
      <img
        src={splashTop}
        alt='둥근 위쪽 원'
        className='absolute w-[100%] h-[100%] max-w-[165px] max-h-[165px] top-0 right-0'
      />
      </div>
      <div className='flex flex-col items-center justify-center min-h-[150px] h-screen'>
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
      <div>
      <img
        src={splashBottom}
        alt='둥근 아래쪽 원'
        className='fixed w-[100%] h-[100%] max-w-[165px] max-h-[265px] bottom-0'
      /></div>
    </div>
  );
}
