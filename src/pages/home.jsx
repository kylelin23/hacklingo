import "./home.css";
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className = "outer-container">
      <Link to = "/auth" className = "title">
        Hacklingo
      </Link>
      <div className = "subtitle">
        Quick convenient daily coding practice!
      </div>
      <Link to = "/auth" className = "button">
        Click here to get started!
      </Link>
    </div>
  );
}

export default App;
