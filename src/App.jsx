import { Link, Route, Routes } from 'react-router-dom';
import RoutingTest from './pages/RoutingTest';
import Main from './pages/Main';

function App() {
  return (
    <div className='bg-white min-h-screen'>
      {/* header, footer가 존재한다면 추후에 components 로 분리할 예정 */}
      <header className='border'>header</header>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/test' element={<RoutingTest />}></Route>
      </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
