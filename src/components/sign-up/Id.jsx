import { useEffect, useState } from "react";
import BottomButton from "../BottomButton";

export default function Id({ next, prevData, setData }) {
  useEffect(() => {
    setId(prevData.username);
    setName(prevData.nickname);
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handlerInput = (state, e) => {
    const input = e.target.value;
    if (state === "id") {
      setId(() => {
        // 영문만, 14자리 이하
        const alphanumeric = input.replace(/[^A-Za-z0-9]/g, "");
        const limit = alphanumeric.substring(0, 14);
        setData({ ...prevData, username: limit });
        return limit;
      });
    }
    if (state === "name") {
      setName(() => {
        // 12자리 이하
        const limit = input.substring(0, 12);
        setData({ ...prevData, nickname: limit });
        return limit;
      });
    }
  };

  const nav = () => {
    if (id !== "" && name !== "") {
      next();
    } else {
      alert("아이디와 닉네임을 다시 확인해주세요.");
    }
  };
  return (
    <>
      <div className="h-full pb-[60px] flex flex-col justify-center">
        <p className="title mb-[1.875rem]">아이디를 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">아이디</p>
        <input
          className="w-full mb-[59.5px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="14 자리 이하"
          onInput={(e) => {
            handlerInput("id", e);
          }}
          value={id}
        />
        <p className="title mb-[1.875rem]">닉네임을 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">닉네임</p>
        <input
          className="w-full px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="12 자리 이하"
          onInput={(e) => {
            handlerInput("name", e);
          }}
          value={name}
        />
        {/* <div className="w-full flex justify-end">
          <button className="w-[88.78px] h-[25.33px] relative right-0 border border-solid border-[#5C5C5C] rounded-[5px] text-[12px] text-[#181717]">
            아이디 중복확인
          </button>
        </div> */}
      </div>

      <BottomButton text="다음으로" click={nav} />
    </>
  );
}
