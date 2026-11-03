import './auth.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className = "outer-container">
            <div className = "nav-bar">
                <Link to = '/' className = 'back-button'>Back</Link>
            </div>
            <div className = "container">
                <div className = "log-in-container">
                    <div>Log In</div>
                    <form className = "form">
                        <label htmlFor = "email">Email</label>
                        <input
                            id = "email"
                            type = "email"
                            value = {email}
                            required
                            onChange = {(e) => setEmail(e.target.value)}
                        />

                        <label htmlFor = "password">Password</label>
                        <input
                            id = "password"
                            type = "password"
                            value = {password}
                            required
                            onChange = {(e) => setPassword(e.target.value)}
                        />

                        <button type = "submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth;