import React from 'react';
import HelperInfo from '../HelperInfo';
import BottomButton from '../BottomButton';

export default function ReviewStar({ click }) {
  let helperUser = {
    username: 'user1234',
    age: '20대',
    gender: '여성',
    rating: 4.5,
    ratingCount: 9,
  };

  return (
    <div className='h-full flex flex-col items-center justify-between p-8'>
      <HelperInfo helperUser={helperUser} />

      <div className='font-bold text-center text-3xl pt-8'>
        {helperUser.username} 님의
        <br />
        도움은 어떠셨나요?
      </div>
      <div className='mt-4 text-[#797979] text-center'>후기를 알려주세요. </div>
      <div>별점부분</div>
      <BottomButton text='다음으로' click={click} />
    </div>
  );
}
