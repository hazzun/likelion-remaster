import React from 'react';
import { Link } from 'react-router-dom';

export default function IncompleteButton({
  props,
  asker = '도움을 주지 못했어요',
}) {
  return (
    <button className='bg-[#565656] rounded-[15px] text-[#FFF9E9]'>
      <Link to='/meetingAfter' state={{ props }}>
        {asker}
      </Link>
    </button>
  );
}
