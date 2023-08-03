import { Link, Route, Routes, useLocation } from "react-router-dom";
import RoutingTest from "./pages/RoutingTest";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MapTest from "./pages/MapTest";
import First from "./components/sign-up/First";
import Recipient from "./pages/Recipient";

function App() {
  const location = useLocation();

  let title;

  switch (location.pathname) {
    case "/recipient":
      title = "도움 글 작성";
      break;
    default:
      title = "에이블";
  }

  return (
    <div className="relative w-full bg-white min-h-screen">
      {/* header, footer 임의로 넣어놨습니다. 따라서, 추후 디자인 초안에 따라 수정 될 예정입니다 */}
      <Header title={title} />
      <div className="pt-[56px] h-screen">
        <Routes>
          <Route path="/" element={<First />}></Route>
          <Route path="/test" element={<RoutingTest />}></Route>
          <Route path="/maptest" element={<MapTest />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/recipient" element={<Recipient />}></Route>
        </Routes>
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
