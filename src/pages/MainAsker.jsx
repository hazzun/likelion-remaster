import React from 'react';
import { Link } from 'react-router-dom';
import BottomButton from '../components/BottomButton';

export default function MainAsker() {
  return (
    <div className='p-4'>
      <Link to='/recipient' className='w-full'>
        <BottomButton text='도움요청 시작하기' />
      </Link>
    </div>
  );
}
