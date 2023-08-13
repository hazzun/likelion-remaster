import React from 'react';
import { Link } from 'react-router-dom';

export default function CompleteButton({ props }) {
  return (
    <button className='bg-[#FFC700] rounded-[15px]'>
      <Link to='/meetingAfter' state={{ props }}>
        해결완료
      </Link>
    </button>
  );
}
