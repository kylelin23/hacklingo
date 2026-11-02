import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Topics from './pages/topics';
import Auth from './pages/auth';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/topics' element = {<Topics />} />
      <Route path = '/auth' element = {<Auth />} />
    </Routes>
  );
}

export default App;
