import React from 'react';
import { Link } from 'react-router-dom';
import { client } from '../client';

export default function CompleteButton({ props, postId }) {
  console.log(props);
  const complete = { command: 'complete' };
  const handleComplete = () => {
    client
      .post(`/meeting/${postId}/`, complete)
      .then((response) => console.log(response))
      .catch((error) => console.log('무슨에러임? ', error));
  };

  return (
    <button className='bg-[#FFC700] rounded-[15px]' onClick={handleComplete}>
      <Link to='/meetingAfter' state={{ props, postId }}>
        해결완료
      </Link>
    </button>
  );
}
