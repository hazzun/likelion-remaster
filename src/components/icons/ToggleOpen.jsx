import React from 'react';
import { BsChevronDown } from 'react-icons/bs';

export default function ToggleOpen({ size }) {
  switch (size) {
    case 'small':
      return <BsChevronDown />;
    case 'medium':
      return <BsChevronDown className='text-3xl' />;
    case 'large':
      return <BsChevronDown className='text-[45px]' />;
    default:
      return <BsChevronDown className='text-base' />;
  }
}
