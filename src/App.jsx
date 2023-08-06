import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import First from './components/sign-up/First';
import Record from './pages/Record';
import Recipient from './pages/Recipient';
import MainHelper from './pages/MainHelper';
import BeforeMeeting from './pages/BeforeMeeting';
import Meeting from './pages/Meeting';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  let title;
  let backHandler;

  switch (location.pathname) {
    case '/recipient':
      title = '도움 글 작성';
      backHandler = page === 1 ? () => navigate(-1) : () => setPage(page - 1);
      break;
    default:
      title = '에이블';
      backHandler = () => navigate(-1);
  }

  return (
    <div className='relative w-full bg-white min-h-screen'>
      <Header title={title} back={backHandler} />
      <div className='pt-[56px] h-screen'>
        <Routes>
          <Route path='/' element={<First />}></Route>
          <Route path='/mainhelper' element={<MainHelper />}></Route>
          <Route path='/record' element={<Record />}></Route>
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
