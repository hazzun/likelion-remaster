import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import Recipient from './pages/Recipient';
import MainHelper from './pages/MainHelper';
import ReqConfirm from './pages/ReqConfirm';
import Meeting from './pages/Meeting';
import Splash from './components/Splash';
import Login from './pages/Login';
import MeetingAfter from './pages/MeetingAfter';

function App() {
  // 초기 화면에 user 정보가 있다면 '/' 으로 (역할고르는 화면)
  // 초기 화면에 user 정보가 없다면 '/login' 으로 (로그인 화면)
  let isLogin = true; // 사용자 정보가 없다는 가정 <- 추후에 백엔드 연동해서 값 불러와야 할 듯 합니다

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
    case '/':
      visiable = false;
      break;
    case '/recipient':
      title = '도움 글 작성';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    case '/meeting':
      title = '도움 수락';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    default:
      title = '와봐유';
      backHandler = () => navigate('/');
  }

  return (
    <div className='relative w-full bg-white min-h-screen'>
      <div className='flex flex-col h-screen'>
        <Header title={title} back={backHandler} visiable={visiable} />
        <div className='flex-1'>
          <Routes>
            <Route
              path='/'
              element={
                loading ? (
                  <Splash />
                ) : isLogin ? (
                  <MainPage />
                ) : (
                  <Navigate replace to='/login' />
                )
              }
            ></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/mainHelper' element={<MainHelper />}></Route>
            <Route path='/reqconfirm' element={<ReqConfirm />}></Route>
            <Route path='/meeting' element={<Meeting />}></Route>
            <Route path='/meetingAfter' element={<MeetingAfter />}></Route>
            <Route
              path='/recipient'
              element={<Recipient page={page} next={() => setPage(page + 1)} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
