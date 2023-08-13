import React from 'react';

export default function IncompleteButton({ asker = '도움을 주지 못했어요' }) {
  return (
    <button className='bg-[#565656] rounded-[15px] text-[#FFF9E9]'>
      {asker}
    </button>
  );
}
