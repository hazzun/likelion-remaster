export default function TwoButton({
  leftText,
  rightText,
  leftClick,
  rightClick,
  leftStyleProps,
  rightStyleProps,
}) {
  const leftStyle = `${leftStyleProps} h-[51px] w-full bg-[#565656] rounded-[15px] font-bold text-[1rem] text-[#FFF9E9]`;
  const rightStyle = `${rightStyleProps} h-[51px] w-full yellow rounded-[15px] font-bold text-[1rem] text-[#181717]`;
  return (
    <div className="w-full flex gap-[7.8px]">
      <button onClick={leftClick} className={leftStyle}>
        {leftText}
      </button>
      <button onClick={rightClick} className={rightStyle}>
        {rightText}
      </button>
    </div>
  );
}
