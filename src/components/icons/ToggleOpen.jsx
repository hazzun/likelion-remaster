import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

export default function ToggleOpen({ size }) {
  switch (size) {
    case 'small':
      return <BsChevronDown className='hover:cursor-pointer ' />;
    case 'medium':
      return <BsChevronDown className='hover:cursor-pointer text-3xl' />;
    case 'large':
      return <BsChevronDown className='hover:cursor-pointer text-[45px]' />;
    default:
      return <BsChevronDown className='hover:cursor-pointer text-base' />;
  }
}
