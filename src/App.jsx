import { Link, Route, Routes } from 'react-router-dom';
import RoutingTest from './pages/RoutingTest';
import Main from './pages/Main';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className='relative w-full bg-white min-h-screen'>
      {/* header, footer 임의로 넣어놨습니다. 따라서, 추후 디자인 초안에 따라 수정 될 예정입니다 */}
      <Header></Header>
      <div className='pt-[56px]'>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/test' element={<RoutingTest />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
