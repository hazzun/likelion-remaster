import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapTest from "./pages/MapTest";
import First from "./components/sign-up/First";
import Recipient from "./pages/Recipient";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(2);

  let title;
  let backHandler;

  switch (location.pathname) {
    case "/recipient":
      title = "도움 글 작성";
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    default:
      title = "에이블";
      backHandler = () => navigate(-1);
  }

  return (
    <div className="relative w-full bg-white min-h-screen">
      {/* header, footer 임의로 넣어놨습니다. 따라서, 추후 디자인 초안에 따라 수정 될 예정입니다 */}
      <Header title={title} back={backHandler} />
      <div className="pt-[56px] h-screen">
        <Routes>
          <Route path="/" element={<First />}></Route>
          {/* <Route path="/test" element={<RoutingTest />}></Route> */}
          <Route path="/MapTest" element={<MapTest />}></Route>
          {/* <Route path="/main" element={<Main />}></Route> */}
          <Route
            path="/recipient"
            element={<Recipient page={page} next={() => setPage(page + 1)} />}
          ></Route>
        </Routes>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
