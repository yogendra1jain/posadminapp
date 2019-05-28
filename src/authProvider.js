// in src/authProvider.js
import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR } from 'react-admin';
import jwtDecode from 'jwt-decode';

const authProvider = (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request('http://13.126.59.19:20029/api/login/admin-login', {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        })
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                localStorage.setItem('token', token);
                let decodeData = jwtDecode(localStorage.getItem('token'));
                localStorage.setItem('retailerId', decodeData.Retailer.id);
            });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 500) {
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
    }
    return Promise.reject('Unkown method');
}

export default authProvider;