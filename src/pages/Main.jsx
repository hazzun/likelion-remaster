import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <main className='p-4'>
      <Link to='/test'>
        <button className='border'>Click me !</button>
      </Link>
    </main>
  );
}
