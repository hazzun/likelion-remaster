export default function BottomButton({ text, click }) {
  return (
    <button
      className="w-full h-[3.25rem] rounded-2xl bg-[#D9D9D9]"
      onClick={click}
    >
      <p className="text-[1.25rem] font-medium">{text}</p>
    </button>
  );
}
