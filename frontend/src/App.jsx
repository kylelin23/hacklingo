import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Topics from './pages/topics';
import Auth from './pages/auth';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/auth' element = {<Auth />} />
      <Route path = '/topics' element = {<Topics />} />
    </Routes>
  );
}

export default App;
