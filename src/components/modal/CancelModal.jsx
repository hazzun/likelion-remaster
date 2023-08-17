import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from 'react-dom';
import AWS from "aws-sdk"

export default function CancelModal({ isVisible, onClose }) {
  
  const navigate = useNavigate();

  if(!isVisible) return null;

  const clickCheck = () => {
    // 백엔드로 요청취소 POST
    
    navigate("/");
  }

  return createPortal(
    <div
      className='fixed h-full w-full inset-x-0 inset-y-0 px-8'
      style={{ background: 'rgba(0, 0, 0, 0.3)' }}
    >
      <div
        className='absolute inset-y-2/4 inset-x-2/4 bg-white h-[10.125rem] w-[310px] max-w-[19.375rem] rounded-[0.625rem]'
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div>
          <p className="font-medium text-[20px] text-center py-10">
            요청한 도움을 취소하시겠습니까?
          </p>
          <div className="flex items-center w-[310px] max-w-[19.375rem] h-14 bg-[#F3F3F3] place-content-around rounded-b-[0.625rem] rounded-br-[0.625rem]">
            <button className="font-semibold text-[16px] w-[50%] h-[100%] text-[#181717] rounded-b-[0.625rem]" onClick={() => onClose()}>
              취소
            </button>
            <button className="font-semibold text-[16px] w-[50%] h-[100%] bg-[#FED130] rounded-br-[0.625rem]" onClick={() => clickCheck()}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')
  );
};