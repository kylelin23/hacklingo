import './topics.css';
import { useNavigate } from 'react-router-dom';

function Topics() {
    const navigate = useNavigate();

    function handleSignOut(){
        localStorage.removeItem('token');
        navigate('/auth');
    }

    return (
        <div>
            <div className = "topics-navbar">
                <div>Hacklingo</div>
                <button onClick = {handleSignOut}>
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default Topics;