import { useEffect, useState } from "react";
import First from "../components/sign-up/First";
import Id from "../components/sign-up/Id";
import Pw from "../components/sign-up/Pw";
import BirthGender from "../components/sign-up/BirthGender";
import Finish from "../components/sign-up/Finish";

export default function SignUp({ page, setPage }) {
  const [data, setData] = useState({
    username: "",
    password: "",
    type: "",
    gender: "",
    nickname: "",
    birth_Year: "",
    birth_Month: "",
    birth_Day: "",
  });

  let components = <Id />;

  const next = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  switch (page) {
    case 1:
      components = <First next={next} setData={setData} prevData={data} />;
      break;
    case 2:
      components = <Id next={next} setData={setData} prevData={data} />;
      break;
    case 3:
      components = <Pw next={next} setData={setData} prevData={data} />;
      break;
    case 4:
      components = (
        <BirthGender setData={setData} next={next} prevData={data} />
      );
      break;
    case 5:
      components = <Finish />;
      break;
    default:
      components = <div>잘못된 페이지에 접근하셨습니다.</div>;
  }

  return (
    <div className="px-5 h-full flex flex-col justify-between pb-[2.125rem] min-h-[500px]">
      {components}
    </div>
  );
}
