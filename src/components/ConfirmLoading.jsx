import React from 'react';
import LoadingIcon from './icons/LoadingIcon';

export default function ConfirmLoading() {
  return (
    <>
      <div className='w-full h-full flex flex-col items-center justify-center text-center gap-8'>
        <LoadingIcon size='large' />
        <p className='text-md text-gray-500'>
          사용자의 응답을 기다리는 중입니다
        </p>
      </div>
    </>
  );
}
