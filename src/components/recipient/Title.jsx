import { useEffect, useState } from 'react';
import CategoryBox from '../CategoryBox';
import BottomButton from '../BottomButton';

export default function Title({ click }) {
  // const [idx, setIdx] = useState();
  // const [cate, setCate] = useState();
  const [cateSelect, setCateSelect] = useState('전체');

  const category = [
    '전체',
    '금융',
    '문서 및 이메일 작성',
    '영상 및 사진',
    '예약/예매',
    '쇼핑',
    '인터넷',
    '기기고장',
    '기타',
  ];
  const selectCategory = (item) => {
    if (item !== cateSelect) setCateSelect(item);
  };
  console.log(cateSelect);

  return (
    <div className='flex flex-col justify-between pb-[2.125rem] px-5 h-full'>
      <div>
        <p className='font-semibold text-[24px] py-5'>
          도움이 필요한 분야를 선택해주세요.
        </p>
        <div className='w-full overflow-auto'>
          {category.map((item, key) =>
            item === cateSelect ? (
              <button
                key={key}
                className='bg-[#FED130] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ) : (
              <button
                key={key}
                className='bg-white border border-[#D9D9D9] text-[18px] px-[10px] py-[2px] rounded-2xl text-lg m-1'
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
      <BottomButton text='다음으로' click={click} />
    </div>
  );
}
