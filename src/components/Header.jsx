import { ReactComponent as BackButton } from '../assets/svg/back-button.svg';

export default function Header({ title, back }) {
  return (
    <div className='flex justify-between items-center px-5 max-w-[480px] w-full fixed top-0 h-[56px] bg-[#FFFFFF]'>
      <button onClick={back}>
        <BackButton />
      </button>
      <p className='text-[20px] font-bold'>{title}</p>
      <div className='w-[9px]' />
    </div>
  );
}
