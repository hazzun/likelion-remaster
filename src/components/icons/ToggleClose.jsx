import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

export default function ToggleClose({ size }) {
  switch (size) {
    case 'small':
      return <BsChevronUp className='hover:cursor-pointer ' />;
    case 'medium':
      return <BsChevronUp className='hover:cursor-pointer text-3xl' />;
    case 'large':
      return <BsChevronUp className='hover:cursor-pointer text-[45px]' />;
    default:
      return <BsChevronUp className='hover:cursor-pointer text-base' />;
  }
}
