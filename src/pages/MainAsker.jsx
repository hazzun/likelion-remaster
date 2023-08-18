import React from 'react';
import { Link } from 'react-router-dom';
import BottomButton from '../components/BottomButton';

export default function MainAsker() {
  return (
    <div className='px-5 h-full flex flex-col justify-between pb-[2.125rem]'>
      <div className='text-center font-semibold text-[24px] py-5 mt-[300px]'>아래 버튼을 눌러<br/>도움을 요청해 보세요!</div>
      <Link to='/recipient' className='w-full'>
        <BottomButton text='도움요청 시작하기' />
      </Link>
    </div>
  );
}
