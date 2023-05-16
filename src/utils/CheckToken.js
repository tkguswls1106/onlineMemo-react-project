//import { useNavigate } from "react-router-dom";
import axios from 'axios'

function CheckToken() {
    //const navigateLogin = useNavigate();
    
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime') || '0';

    if (storedToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;

        const remainingTime = storedExpirationDate - String(new Date().getTime());
        if (remainingTime <= '1000') {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');

            window.location.href = '/login';
        }
    }
    else {
        window.location.href = '/login';
    }
}

export { CheckToken };