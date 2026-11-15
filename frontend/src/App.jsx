import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/home';
import Topics from './pages/topics';
import Auth from './pages/auth';

function App() {
  return (
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/auth' element = {<Auth />} />
      <Route element = {<ProtectedRoute />}>
        <Route path = '/topics' element = {<Topics />} />
      </Route>
    </Routes>
  );
}

export default App;
