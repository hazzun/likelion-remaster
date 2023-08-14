import React from 'react';
import BottomButton from '../BottomButton';
import { ReactComponent as Success } from '../../assets/svg/success.svg';
import { Link } from 'react-router-dom';

export default function ReviewBefore({ click }) {
  let helperUser = 'user3456';
  return (
    <>
      <div className='h-full flex flex-col items-center justify-between p-8'>
        <div className='font-bold text-center text-2xl pt-8'>
          {helperUser}의 도움으로
          <br />
          문제를 해결했어요!
        </div>
        <Success />
        <div className='mt-4 text-center'>
          <p className='text-2xl font-semibold '>정말 수고했어요!</p>
          <p className='text-[#797979]'>후기를 남겨볼래요?</p>
        </div>
        <div className='w-full grid grid-cols-2 text-[16px] font-bold gap-2 h-[50px]'>
          <button className='bg-[#565656] rounded-[15px] text-[#FFF9E9]'>
            <Link to='/'>처음으로</Link>
          </button>
          <BottomButton text='후기 남기기' click={click} />
        </div>
      </div>
    </>
  );
}
