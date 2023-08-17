import { useEffect, useState } from "react";
import { signUp } from "../../client";
import BottomButton from "../BottomButton";

export default function BirthGender({ next, prevData, setData }) {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    setYear(prevData.birth_Year);
    setMonth(prevData.birth_Month);
    setDay(prevData.birth_Day);
    setGender(prevData.gender);
  }, []);

  const handlerInput = (state, e) => {
    const input = e.target.value;
    if (state === "year") {
      setYear(() => {
        // 영문만, 14자리 이하
        const numeric = input.replace(/[^0-9]/g, "");
        const limit = numeric.substring(0, 4);
        setData({ ...prevData, birth_Year: limit });
        return limit;
      });
    }
    if (state === "month") {
      setMonth(() => {
        const numeric = input.replace(/[^0-9]/g, "");
        let limit = numeric.substring(0, 2);
        if (limit[0] === "0") {
          limit = limit.substring(1);
        }
        if (parseInt(limit) > 12) {
          limit = "12";
        }
        setData({ ...prevData, birth_Month: limit });
        return limit;
      });
    }
    if (state === "day") {
      setDay(() => {
        const numeric = input.replace(/[^0-9]/g, "");
        let limit = numeric.substring(0, 2);
        if (limit[0] === "0") {
          limit = limit.substring(1);
        }
        const longMonths = [1, 3, 5, 7, 8, 10, 12];
        const shortMonths = [4, 6, 9, 11];
        if (longMonths.includes(parseInt(month)) && parseInt(limit) > 31) {
          limit = "31";
        }
        if (shortMonths.includes(parseInt(month)) && parseInt(limit) > 30) {
          limit = "30";
        }
        if (month === "2" && parseInt(limit) > 29) {
          limit = "29";
        }
        setData({ ...prevData, birth_Day: limit });
        return limit;
      });
    }
  };

  const handleGender = (gender) => {
    setGender(gender);
    setData({ ...prevData, gender: gender });
  };

  const nav = () => {
    if (year !== "" && month !== "" && day !== "" && gender !== "") {
      signUp(prevData);
      next();
    }
  };

  return (
    <>
      <div className="pt-[5.375rem]">
        <p className="title mb-[1.875rem]">생년월일을 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          생년월일
        </p>
        <div className="flex items-end mb-[40.04px]">
          <input
            className="w-[103.32px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
            onInput={(e) => handlerInput("year", e)}
            value={year}
          />
          <p className="mr-[13.68px] font-medium text-[1rem] text-[#616161]">
            년
          </p>
          <input
            className="w-[54.76px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
            onInput={(e) => handlerInput("month", e)}
            value={month}
          />
          <p className="mr-[13.68px] font-medium text-[1rem] text-[#616161]">
            월
          </p>
          <input
            className="w-[54.76px] mr-[5.36px] px-3.5 border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
            onInput={(e) => handlerInput("day", e)}
            value={day}
          />
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
              onChange={() => handleGender("남성")}
              checked={gender === "남성"}
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
              onChange={() => handleGender("여성")}
              checked={gender === "여성"}
            />
            <span className="checkmark" />
          </label>
          <p className="ml-[10px] font-medium text-[1rem] text-[#616161]">
            여성
          </p>
        </div>
      </div>

      <BottomButton text="다음으로" click={nav} />
    </>
  );
}
