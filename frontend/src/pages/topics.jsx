import './topics.css';
import { Link, useNavigate } from 'react-router-dom';

function Topics() {
    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <div>
            <div className = "topics-navbar">
                <Link to = '/' className = "topics-back-button">Hacklingo</Link>
                <button onClick = {handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Topics;