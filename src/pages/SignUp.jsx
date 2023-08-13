import { useState } from "react";

import Id from "../components/sign-up/Id";
import Pw from "../components/sign-up/Pw";
import BirthGender from "../components/sign-up/BirthGender";
import Finish from "../components/sign-up/Finish";

export default function SignUp() {
  const [page, setPage] = useState(1);

  let components = <Id />;

  switch (page) {
    case 1:
      components = <Id next={() => setPage(page + 1)} />;
      break;
    case 2:
      components = <Pw next={() => setPage(page + 1)} />;
      break;
    case 3:
      components = <BirthGender next={() => setPage(page + 1)} />;
      break;
    case 4:
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
