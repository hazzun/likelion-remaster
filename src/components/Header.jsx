import { ReactComponent as BackButton } from "../assets/svg/back-button.svg";
import logo from "../assets/logo.png";
import { ReactComponent as User } from "../assets/svg/user.svg";

export default function Header({ title, back, visiable = true, location }) {
  return (
    <>
      {visiable ? (
        <div className="flex justify-between items-center px-5 max-w-[480px] w-full h-[56px] bg-[#FFFFFF]">
          {location === "/mainhelper" ? (
            <>
              <img src={logo} alt="Logo" className="w-[32.07px] h-[32.07px]" />
              <p className="text-[20px] font-bold">{title}</p>
              <button>
                <User />
              </button>
            </>
          ) : (
            <>
              <button onClick={back}>
                <BackButton />
              </button>
              <p className="text-[20px] font-bold">{title}</p>
              <div className="w-[9px]" />
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
