import { useEffect, useState } from "react";
import BottomButton from "../BottomButton";

export default function Pw({ next, prevData, setData }) {
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [onChange, setOnChange] = useState(true);

  useEffect(() => {
    setPw(prevData.password);
    setPwCheck(prevData.password);
  }, []);

  const handlePwChange = (e) => {
    const inputValue = e.target.value;
    setPw(inputValue);
  };

  const handlePwCheck = (e) => {
    const inputValue = e.target.value;
    setPwCheck(inputValue);
    setOnChange(true);
  };

  const handleNext = () => {
    // 유효성 검사 : 영문과 숫자 조합, 8자 이상
    const regex =
      /^(?=.*[A-Za-z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/;
    const isValidPw = regex.test(pwCheck);

    if (pw === pwCheck && pw !== "" && pwCheck !== "" && isValidPw) {
      setData({ ...prevData, password: pwCheck });
      // setOnChange(true);
      return next();
    } else {
      setOnChange(false);
    }
  };
  return (
    <>
      <div className="pt-[5.375rem]">
        <p className="title mb-[1.875rem]">비밀번호를 입력해주세요.</p>
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          비밀번호
        </p>
        <input
          type="password"
          className="w-full px-3.5 mb-[18.97px] border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="영문,숫자,특수문자 조합 8자리 이상"
          onChange={handlePwChange}
          value={pw}
        />
        <p className="mb-2.5 font-medium text-[1rem] text-[#616161]">
          비밀번호 확인
        </p>
        <input
          type="password"
          className="w-full px-3.5 mb-[9.96px] border border-solid border-[#5C5C5C] rounded-md h-[2.75rem] placeholder:font-medium placeholder:text-[0.75rem] placeholder:text-[#D9D9D9]"
          placeholder="영문,숫자,특수문자 조합 8자리 이상"
          onChange={handlePwCheck}
          value={pwCheck}
        />
        {!onChange ? (
          <p className="font-medium text-[13px] text-[#ff4242]">
            비밀번호를 다시 확인해주세요.
          </p>
        ) : (
          ""
        )}
      </div>

      <BottomButton text="다음으로" click={handleNext} />
    </>
  );
}
