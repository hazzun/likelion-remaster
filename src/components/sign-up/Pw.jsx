import BottomButton from "../BottomButton";

export default function Pw({ next }) {
  return (
    <>
      <div className="pt-[5.375rem]">
        <p className="title mb-[1.875rem]">비밀번호를 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          비밀번호
        </p>
        <input
          className="w-full px-3.5 mb-[18.97px] border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="영문+숫자 조합 8자리 이상"
        />
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          비밀번호
        </p>
        <input
          className="w-full px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="영문+숫자 조합 8자리 이상"
        />
      </div>

      <BottomButton text="다음으로" click={next} />
    </>
  );
}
