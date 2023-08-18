import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CancelModal from './modal/CancelModal';
import ReRequestModal from './modal/ReRequestModal';

export default function IncompleteButton({
  props,
  asker = '도움을 주지 못했어요',
  isHelp = true,
  postId,
  setHelperReset,
}) {
  const [modalShow, setModalShow] = useState(false);
  const clickCancel = () => {
    setModalShow(true);
  };
  return (
    <>
      {isHelp ? (
        <button className='bg-[#565656] rounded-[15px] text-[#FFF9E9]'>
          <Link to='/meetingAfter' state={{ props }}>
            {asker}
          </Link>
        </button>
      ) : (
        <>
          <button
            className='bg-[#565656] rounded-[15px] text-[#FFF9E9]'
            onClick={clickCancel}
          >
            {asker}
          </button>
          <ReRequestModal
            isVisible={modalShow}
            onClose={() => setModalShow(false)}
            postId={postId}
            setHelperReset={setHelperReset}
          />
        </>
      )}
    </>
  );
}
