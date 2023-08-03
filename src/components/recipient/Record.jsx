import { useState } from "react";
import { ReactComponent as Mic } from "../../assets/svg/mic.svg";

export default function Record({}) {
  const [save, setSave] = useState(false);

  return (
    <div className="overflow-hidden">
      <div className="w-full px-5">
        <p className="mt-[2.5rem] mb-[2.625rem] font-medium text-[1.125rem]">
          도움이 필요한 내용을 녹음해주세요.
        </p>
        <div className="w-full mb-[2.125rem] flex flex-col items-center">
          <button onClick={() => setSave(true)}>
            <div className="h-[11.8rem] w-[11.8rem] mb-[2.125rem] flex justify-center items-center rounded-full border-4 border-solid border-[#D9D9D9]">
              <div className="h-[10.125rem] w-[10.125rem] flex justify-center items-center bg-[#D9D9D9] rounded-full drop-shadow-[0_0_6px_rgba(0,0,0,0.2)]">
                <Mic />
              </div>
            </div>
          </button>
          <p className="font-medium text-[1.125rem]">00:00:00</p>
        </div>
      </div>
      <div className="w-full">
        <p className="relative left-[26.7%] text-[0.5rem] color-gray3">00:00</p>
      </div>
      <div className="h-[6.125rem] w-full bg-[#D9D9D9]">
        <div className="relative h-full w-[0.0625rem] bg-black left-[30%]"></div>
      </div>

      {/* 모달창 */}
      {save ? (
        <div
          className="fixed h-full w-full inset-x-0 inset-y-0 px-8"
          style={{ background: "rgba(0, 0, 0, 0.3)" }}
        >
          <div
            className="absolute inset-y-2/4 inset-x-2/4 bg-white h-[10.125rem] w-full max-w-[19.375rem] rounded-[0.625rem]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <div>
              <p>저장하시겠습니까?</p>
              <div>
                <button>재녹음</button>
                <button>확인</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
