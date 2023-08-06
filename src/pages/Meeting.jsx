import React from 'react';
import CompleteButton from '../components/CompleteButton';
import IncompleteButton from '../components/IncompleteButton';

export default function Meeting() {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex h-full items-center justify-center'>
        지금 문제를 해결중입니다
      </div>
      <div className='w-full h-20 grid grid-cols-2'>
        <CompleteButton />
        <IncompleteButton />
      </div>
    </div>
  );
}
