import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function LoadingIcon({ size }) {
  switch (size) {
    case 'small':
      return <AiOutlineLoading3Quarters className='animate-spin text-[20px]' />;
    case 'medium':
      return <AiOutlineLoading3Quarters className='animate-spin text-[30px]' />;
    case 'large':
      return <AiOutlineLoading3Quarters className='animate-spin text-[40px]' />;
    default:
      return <AiOutlineLoading3Quarters className='animate-spin text-[40px]' />;
  }
}
