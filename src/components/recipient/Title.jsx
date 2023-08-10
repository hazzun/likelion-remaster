import { useState } from "react";
import CategoryBox from "../CategoryBox";
import BottomButton from "../BottomButton";

export default function Title({ click }) {
  const [idx, setIdx] = useState();

  const category = [
    "내용1",
    "내용2",
    "내용3",
    "내용4",
    "내용5",
    "내용6",
    "내용7",
    "내용8",
  ];

  return (
    <div className="flex flex-col justify-between pt-8 pb-[2.125rem] px-5 h-full">
      <div>
        <p className="font-semibold text-[24px] mb-[2.3025rem]">
          도움이 필요한 분야를 선택해주세요.
        </p>
        <div className="w-[85%] grid grid-cols-4 gap-2">
          {category.map((item, i) => {
            const check = idx === i ? true : false;
            return (
              <CategoryBox
                text={item}
                click={() => setIdx((prev) => (prev === i ? "" : i))}
                check={check}
              />
            );
          })}
        </div>
        {/* <p className="mt-[3.375rem] text-[1.25rem] font-medium mb-[1.875rem]">
          제목을 입력해주세요.
        </p>
        <p className="font-medium text-[1rem] text-[#616161] mb-2.5">제목</p>
        <input
          className="w-[85%] h-[2.875rem] rounded-md pl-4 border border-solid	border-[#5C5C5C]"
          placeholder="최대 10자"
        /> */}
      </div>
      <BottomButton text="다음으로" click={click} />
    </div>
  );
}
