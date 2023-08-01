import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
  return (
    <main className='p-4'>
      <Link to='/test'>
        <button className='border'>Click me !</button>
      </Link>
      <Link to='/maptest'>
        <button className='ml-10 border'>Map API Test</button>
      </Link>
    </main>
  );
}
