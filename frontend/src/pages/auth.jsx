import './auth.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        navigate('/topics');
    }

    return (
        <div className = "auth-outer-container">
            <div className = "auth-nav-bar">
                <Link to = '/' className = 'auth-back-button'>Hacklingo</Link>
            </div>
            <div className = "auth-container">
                {showSignUp === false &&
                    <div className = "auth-log-in-container">
                        <div className = "auth-title">Log In</div>
                        <form onSubmit = {handleSubmit} className = "auth-form">
                            <label htmlFor = "email" className = "auth-label">Email</label>
                            <input
                                className = "auth-input"
                                id = "email"
                                type = "email"
                                value = {email}
                                required
                                onChange = {(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor = "password" className = "auth-label">Password</label>
                            <input
                                className = "auth-input"
                                id = "password"
                                type = "password"
                                value = {password}
                                required
                                onChange = {(e) => setPassword(e.target.value)}
                            />

                            <button className = "auth-submit" type = "submit">Submit</button>
                        </form>
                        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem"}}>
                            <div>Don't have an account yet?</div>
                            <div>Click here to <span onClick = {() => setShowSignUp(true)} className = "auth-sign-up-link">sign up</span>!</div>
                        </div>
                    </div>
                }

                {showSignUp === true &&
                    <div className = "auth-log-in-container">
                        <div className = "auth-title">Sign Up</div>
                        <form onSubmit = {handleSubmit} className = "auth-form">
                            <label htmlFor = "email" className = "auth-label">Email</label>
                            <input
                                className = "auth-input"
                                id = "email"
                                type = "email"
                                value = {email}
                                required
                                onChange = {(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor = "password" className = "auth-label">Password</label>
                            <input
                                className = "auth-input"
                                id = "password"
                                type = "password"
                                value = {password}
                                required
                                onChange = {(e) => setPassword(e.target.value)}
                            />

                            <button className = "auth-submit" type = "submit">Submit</button>
                        </form>
                        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem"}}>
                            <div>Already have an account? </div>
                            <div>Click here to <span onClick = {() => setShowSignUp(false)} className = "auth-sign-up-link">sign in</span>!</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Auth;