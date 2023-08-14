import { useState } from "react";
import BottomButton from "../BottomButton";

export default function BirthGender({ next }) {
  const [check, setCheck] = useState("male");

  const handleCheck = (e) => {
    setCheck(e.target.value);
  };
  return (
    <>
      <div className="pt-[5.375rem]">
        <p className="title mb-[1.875rem]">생년월일을 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          생년월일
        </p>
        <div className="flex items-end mb-[40.04px]">
          <input className="w-[103.32px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]" />
          <p className="mr-[13.68px] font-medium text-[1rem] text-[#616161]">
            년
          </p>
          <input className="w-[54.76px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]" />
          <p className="mr-[13.68px] font-medium text-[1rem] text-[#616161]">
            월
          </p>
          <input className="w-[54.76px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]" />
          <p className="mr-[13.68px] font-medium text-[1rem] text-[#616161]">
            일
          </p>
        </div>
        <p className="mb-[28.18px] font-medium text-[1rem] text-[#616161]">
          성별을 입력해주세요.
        </p>
        <p className="mb-[11.68px] font-medium text-[1rem] text-[#616161]">
          성별
        </p>
        <div className="flex items-center">
          <label className="custom-checkbox">
            <input
              className="hidden-checkbox"
              type="checkbox"
              name="gender"
              value="male"
              onChange={handleCheck}
              checked={check === "male"}
            />
            <span className="checkmark" />
          </label>
          <p className="ml-[10px] mr-[26.12px] font-medium text-[1rem] text-[#616161]">
            남성
          </p>
          <label className="custom-checkbox">
            <input
              className="hidden-checkbox"
              type="checkbox"
              name="gender"
              value="female"
              onChange={handleCheck}
              checked={check === "female"}
            />
            <span className="checkmark" />
          </label>
          <p className="ml-[10px] font-medium text-[1rem] text-[#616161]">
            여성
          </p>
        </div>
      </div>

      <BottomButton text="다음으로" click={next} />
    </>
  );
}
