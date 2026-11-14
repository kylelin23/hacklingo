import './auth.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showSignUp, setShowSignUp] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function verify(){
            const token = localStorage.getItem('token');
            if(token){
                try{
                    const res = await fetch('/api/auth/verify', {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if(res.ok){
                        navigate('/topics');
                    }
                    else{
                        localStorage.removeItem('token');
                    }
                }
                catch{
                    console.log('Server error');
                }
            }
        }
        verify();
    }, [])

    async function handleSignUp(e){
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if(!res.ok){
                if(res.status === 409){
                    setError("User already registered");
                }
                else if(res.status === 400){
                    setError("Email and password are required")
                }
                else{
                    setError('Something went wrong');
                }
                return
            }
            navigate('/topics');
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    async function handleSignIn(e){
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if(!res.ok){
                if(res.status === 401){
                    setError('Invalid credentials');
                }
                else if(res.status === 400){
                    setError('Email and password are required');
                }
                else{
                    setError('Something went wrong');
                }
                return;
            }
            const data = await res.json();
            localStorage.setItem('token', data.token);
            navigate('/topics');
        } catch {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
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
                        <form onSubmit = {handleSignIn} className = "auth-form">
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
                            <button className = "auth-submit" type = "submit" disabled = {loading}>{loading ? 'Loading...' : 'Log In'}</button>
                        </form>
                        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem"}}>
                            <div>Don't have an account yet?</div>
                            <div>Click here to <span onClick = {() => {
                                    setShowSignUp(true);
                                    setError('');
                                }} className = "auth-sign-up-link">sign up</span>!</div>
                        </div>
                        <div className = "auth-error">{error}</div>
                    </div>
                }

                {showSignUp === true &&
                    <div className = "auth-log-in-container">
                        <div className = "auth-title">Sign Up</div>
                        <form onSubmit = {handleSignUp} className = "auth-form">
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

                            <button className = "auth-submit" type = "submit" disabled = {loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                        </form>
                        <div style = {{display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem"}}>
                            <div>Already have an account? </div>
                            <div>Click here to <span onClick = {() => {
                                    setShowSignUp(false);
                                    setError('');
                                }} className = "auth-sign-up-link">log in</span>!</div>
                        </div>
                        <div className = "auth-error">{error}</div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Auth;