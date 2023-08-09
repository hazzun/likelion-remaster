import { BiMicrophone } from 'react-icons/bi';
import React from 'react';

export default function RecordIcon({ size }) {
  switch (size) {
    case 'small':
      return <BiMicrophone className='text-sm' />;
    case 'medium':
      return <BiMicrophone className='text-xl' />;
    case 'large':
      return <BiMicrophone className='text-[80px]' />;
    default:
      return <BiMicrophone className='text-[20px]' />;
  }
}
