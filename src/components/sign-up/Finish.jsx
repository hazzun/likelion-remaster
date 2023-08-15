import { useNavigate } from "react-router";
import BottomButton from "../BottomButton";
import { ReactComponent as Draw } from "../../assets/svg/signup-draw.svg";

export default function Finish() {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center">
        <Draw />
        <p className="heading-2 mt-[20.73px] mb-[5.67px]">회원가입 완료</p>
        <p className="font-medium text-[1rem]">도움을 주고 받아보세요!</p>
      </div>

      <BottomButton text="완료" click={() => navigate("/")} />
    </>
  );
}
