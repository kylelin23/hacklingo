import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedRoute(){

    const navigate = useNavigate();

    useEffect(() => {
        async function verify(){
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/auth');
                return;
            }

            try{
                const res = await fetch('/api/auth/verify', {
                    headers: { Authorization : `Bearer ${token}` }
                });

                if(!res.ok){
                    navigate('/auth');
                    localStorage.removeItem('token');
                }
            }
            catch{
                console.log("Server error, couldn't verify token");
                navigate('/auth');
                localStorage.removeItem('token');
            }
        }
        verify();
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoute;