import { useEffect, useState } from "react";
import BottomButton from "../BottomButton";

export default function Id({ next, prevData, setData }) {
  useEffect(() => {
    setId(prevData.username);
    setName(prevData.nickname);
  }, []);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [regex, setRegex] = useState();

  const handleInput = async (state, e) => {
    const input = e.target.value;
    if (state === "id") {
      setId(() => {
        console.log(input);

        const regex = /[^A-Za-z0-9]/g;
        let sanitizedInput = input.replace(regex, "");

        // 영문과 숫자가 아닌 문자가 있는지 확인
        if (sanitizedInput !== input) {
          setRegex(true);
        } else {
          setRegex(false);
        }

        console.log(sanitizedInput);
        // 영문만, 14자리 이하
        const limit = sanitizedInput.substring(0, 14);
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
          className="w-full mb-[4px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="14 자리 이하"
          onChange={(e) => {
            handleInput("id", e);
          }}
          value={id}
        />
        <div className="mb-[59.5px] h-[18px]">
          <p className="text-[12px] text-[red]">
            {regex ? "영문과 숫자만 입력 가능합니다." : ""}
          </p>
        </div>
        <p className="title mb-[1.875rem]">닉네임을 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">닉네임</p>
        <input
          className="w-full px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="12 자리 이하"
          onChange={(e) => {
            handleInput("name", e);
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
