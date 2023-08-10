import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import First from './components/sign-up/First';
import Recipient from './pages/Recipient';
import MainHelper from './pages/MainHelper';
import ReqConfirm from './pages/ReqConfirm';
import BeforeMeeting from './pages/BeforeMeeting';
import Meeting from './pages/Meeting';
import Splash from './components/Splash';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 잠시 후 스플래시 화면 숨기기
    setTimeout(() => {
      setLoading(false);
    }, 3000); // 3초 동안 스플래시 화면 보여주기
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
    default:
      title = '와봐유';
      backHandler = () => navigate('/');
  }

  return (
    <div className='relative w-full bg-white min-h-screen'>
      <Routes>
        {/* <Route path='/login' element={loading ? <Splash /> : <Login />}></Route> */}
        <Route path='/' element={loading ? <Splash /> : <Login />}></Route>
      </Routes>
      <Header title={title} back={backHandler} visiable={visiable} />
      <div className='pt-[56px] h-screen'>
        <Routes>
          <Route path='/signup' element={<First />}></Route>
          <Route path='/mainhelper' element={<MainHelper />}></Route>
          <Route path='/reqconfirm' element={<ReqConfirm />}></Route>
          <Route path='/beforemeeting' element={<BeforeMeeting />}></Route>
          <Route path='/meeting' element={<Meeting />}></Route>
          <Route
            path='/recipient'
            element={<Recipient page={page} next={() => setPage(page + 1)} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
