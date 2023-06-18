import './App.css';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import { Route, Routes, Link } from 'react-router-dom';

//Routes는 여러 Route를 감싸고 현재 URL 경로에 맞게 적절한 Route 컴포넌트를 페이지에 렌더링
function App() {
  return (
    <div className="App">
            
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='/edit' element={<Edit />} />
        
      </Routes>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
        <Link to={"/edit"}>Edit</Link>
        
      </div>
    </div>
  );
}

export default App;
