import BottomButton from "../BottomButton";

export default function Id({ next }) {
  return (
    <>
      <div className="pt-[5.375rem]">
        <p className="title mb-[1.875rem]">아이디를 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">아이디</p>
        <input
          className="w-full px-3.5 mb-[9.4px] border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="14 자리 이하"
        />
        <div className="w-full flex justify-end">
          <button className="w-[88.78px] h-[25.33px] relative right-0 border border-solid border-[#5C5C5C] rounded-[5px] text-[12px] text-[#181717]">
            아이디 중복확인
          </button>
        </div>
      </div>

      <BottomButton text="다음으로" click={next} />
    </>
  );
}
