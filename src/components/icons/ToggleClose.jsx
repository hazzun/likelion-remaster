import React from 'react';
import { BsChevronUp } from 'react-icons/bs';

export default function ToggleClose({ size }) {
  switch (size) {
    case 'small':
      return <BsChevronUp />;
    case 'medium':
      return <BsChevronUp className='text-3xl' />;
    case 'large':
      return <BsChevronUp className='text-[45px]' />;
    default:
      return <BsChevronUp className='text-base' />;
  }
}
