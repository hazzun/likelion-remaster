import React, { useState } from 'react';
import logo from '../assets/logo.png';
import title from '../assets/title.png';
import { Link } from 'react-router-dom';

export default function Login() {
  const [autoLogin, setAutoLogin] = useState(false);

  const handleAutoLogin = () => {
    setAutoLogin(!autoLogin);
  };
  console.log(autoLogin);

  return (
    <div className='h-screen text-center flex flex-col justify-center gap-20 overflow-hidden'>
      <div className='flex flex-col justify-center'>
        <div className='flex gap-2 justify-center items-center'>
          <img
            src={logo}
            alt='Logo'
            className='w-[80px] h-[80px] animate-waving'
          />
          <img src={title} alt='와봐유' className='w-[150px] h-[56px]' />
        </div>
        <p className='text-[#5C5C5C]'>도움을 품앗이해요</p>
        <form className='mt-20 flex flex-col gap-1 items-center justify-center'>
          <div className='w-[75%]'>
            <div className='flex flex-row gap-1 items-center justify-between w-full'>
              <div className='text-[#CACACA] text-[16px] w-[80px] text-left pl-0.5'>
                아이디
              </div>
              <input
                className='border-2 rounded-lg w-[100%] h-[40px] pl-[10px] mb-1'
                type='text'
                placeholder='14자리 이하'
              />
            </div>
            <div className='flex flex-row gap-1 items-center justify-between w-full'>
              <div className='text-[#CACACA] text-[16px] w-[80px] text-left pl-0.5'>
                비밀번호
              </div>
              <input
                className='border-2 rounded-lg w-[100%] h-[40px] pl-[10px]'
                type='password'
                placeholder='8-14자 영문, 숫자, 특수기호'
              />
            </div>
          </div>
          <button className='w-[75%] h-[40px] bg-[#FFC700] rounded-lg my-4'>
            <span>로그인</span>
          </button>
          <div className='text-[12px] text-[#828282] flex w-[75%] justify-between'>
            <div className='flex items-center gap-1'>
              <input
                id='auto-login'
                type='checkbox'
                checked={autoLogin}
                onChange={() => handleAutoLogin()}
              />
              <label htmlFor='auto-login'>자동로그인</label>
            </div>
            <p>{/* <span>아이디찾기</span> | <span>바말번호 찾기</span> */}</p>
          </div>
        </form>
      </div>

      <div className='text-[12px] text-[#828282]'>
        <span>아직 계정이 없으신가요?</span>
        <Link to='/signup'>
          <span className='underline ml-2'>회원가입하기</span>
        </Link>
      </div>
    </div>
  );
}
