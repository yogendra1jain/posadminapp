// in src/authProvider.js
import { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT, AUTH_ERROR,AUTH_GET_PERMISSIONS } from 'react-admin';
import jwtDecode from 'jwt-decode';
import { APPLICATION_BFF_URL } from './global/UrlConstants';
import _get from 'lodash/get';

const authProvider = (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        const request = new Request(`${APPLICATION_BFF_URL}login/admin-login`, {
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
                localStorage.setItem('storeId', _get(decodeData, 'Store.id', ''))
                localStorage.setItem('role', _get(decodeData, 'Role', ''))
                localStorage.setItem('storeName', _get(decodeData, 'Store.name', ''))
                localStorage.setItem('email', _get(decodeData, 'RetailerAdmin.email', ''))
                if (_get(decodeData, 'Role', '') == "1") {
                    localStorage.setItem('email', _get(decodeData, 'RetailerAdmin.email', ''))
                }
                else if (_get(decodeData, 'Role', '') == "2") {
                    localStorage.setItem('email', _get(decodeData, 'StoreAdmin.email', ''))
                }

            });
    }
    if (type === AUTH_LOGOUT) {
        let lastSynched = localStorage.getItem('lastSynched')
        localStorage.clear();
        localStorage.setItem('lastSynched',lastSynched);
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
    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        return role ? Promise.resolve(role) : Promise.reject();
    }
    return Promise.reject('Unkown method');
}

export default authProvider;