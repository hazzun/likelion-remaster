import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Recipient from "./pages/Recipient";
import MainHelper from "./pages/MainHelper";
import ReqConfirm from "./pages/ReqConfirm";
import Meeting from "./pages/Meeting";
import Splash from "./components/Splash";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 잠시 후 스플래시 화면 숨기기
    setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5초 동안 스플래시 화면 보여주기
  }, []);

  let title;
  let backHandler;
  let visiable;

  switch (location.pathname) {
    case "/":
      visiable = false;
      break;
    case "/recipient":
      title = "도움 글 작성";
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    case "/meeting":
      title = "도움 수락";
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    case "/signup":
      title = "회원 가입";
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    default:
      title = "와봐유";
      backHandler = () => navigate("/");
  }

  return (
    <div className="relative w-full bg-white min-h-screen">
      <div className="flex flex-col h-screen">
        <Header title={title} back={backHandler} visiable={visiable} />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={loading ? <Splash /> : <Login />}></Route>
            <Route
              path="/signup"
              element={<SignUp page={page} setPage={setPage} />}
            ></Route>
            <Route path="/mainhelper" element={<MainHelper />}></Route>
            <Route path="/reqconfirm" element={<ReqConfirm />}></Route>
            <Route path="/meeting" element={<Meeting />}></Route>
            <Route
              path="/recipient"
              element={<Recipient page={page} next={() => setPage(page + 1)} />}
            ></Route>
            <Route path="/mypage" element={<Mypage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
