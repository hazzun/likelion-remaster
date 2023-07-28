import React from 'react';
import { Link } from 'react-router-dom';

export default function RoutingTest() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-10'>
      <Link to='/'>
        <button className='border py-4 px-2 bg-slate-400 text-white hover:bg-white hover:text-slate-400'>
          메인화면으로 돌아가기
        </button>
      </Link>
      <p>페이지 라우팅 잘 되나 만들어봄</p>
    </div>
  );
}
