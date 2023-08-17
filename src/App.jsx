import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Recipient from './pages/Recipient';
import MainHelper from './pages/MainHelper';
import ReqConfirm from './pages/ReqConfirm';
import Meeting from './pages/Meeting';
import Splash from './components/Splash';
import Login from './pages/Login';
import MeetingAfter from './pages/MeetingAfter';
import SignUp from './pages/SignUp';
import MainAsker from './pages/MainAsker';

function App() {
  // 초기 화면에 user 정보가 있다면 '/' 으로 (역할고르는 화면)
  // 초기 화면에 user 정보가 없다면 '/login' 으로 (로그인 화면)
  let isLogin = false; // 사용자 정보가 없다는 가정 <- 추후에 백엔드 연동해서 값 불러와야 할 듯 합니다

  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [mypage, setMypage] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 잠시 후 스플래시 화면 숨기기
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2초 동안 스플래시 화면 보여주기
  }, []);

  let title;
  let backHandler;
  let visible;
  let backVisible;

  switch (location.pathname) {
    case '/':
      visible = false;
      break;
    case '/login':
      visible = false;
      break;
    case '/mainasker':
      backVisible = false;
      title = '도움 요청';
      break;
    case '/recipient':
      title = '도움 글 작성';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    case '/meeting':
      title = '도움 수락';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    case '/signup':
      title = '회원 가입';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    default:
      title = '와봐유';
      backHandler = () => navigate('/');
  }

  return (
    <div className='relative w-full bg-white min-h-screen'>
      <div className='flex flex-col h-screen'>
        <Header
          title={title}
          back={backHandler}
          visible={visible}
          backVisible={backVisible}
          location={location.pathname}
          mypage={() => setMypage(true)}
        />
        <div className='flex-1'>
          <Routes>
            <Route
              path='/'
              element={
                loading ? (
                  <Splash />
                ) : isLogin ? (
                  <div>잘못된 페이지: 로그인 정보가 필요합니다.</div>
                ) : (
                  <Navigate replace to='/login' />
                )
              }
            ></Route>
            <Route
              path='/signup'
              element={<SignUp page={page} setPage={setPage} />}
            />
            <Route path='/mainasker' element={<MainAsker />} />
            <Route
              path='/mainhelper'
              element={
                <MainHelper
                  mypage={mypage}
                  closeMypage={() => setMypage(false)}
                />
              }
            />
            <Route path='/reqconfirm' element={<ReqConfirm />} />
            <Route path='/meeting' element={<Meeting />} />
            <Route path='/meetingafter' element={<MeetingAfter />}></Route>
            <Route
              path='/recipient'
              element={<Recipient page={page} next={() => setPage(page + 1)} />}
            />
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
