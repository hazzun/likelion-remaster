export default function BottomButton({ text, click }) {
  return (
    <button
      className="w-full h-[52px] min-h-[52px] rounded-2xl yellow"
      onClick={click}
    >
      <p className="text-[1.25rem] font-medium">{text}</p>
    </button>
  );
}
