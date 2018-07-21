/* eslint-disable func-style */

import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

export const me = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/auth/me');
        dispatch(getUser(res.data || defaultUser));
    } catch (err) {
        console.error(err);
    }
};

export const auth = (email, password, method) => async (dispatch) => {
    try {
        const response = await axios.post(`/api/auth/${method}`, {email, password});
        dispatch(getUser(response.data));
        history.push('/home');
    } catch (error) {
        console.error(error);
        dispatch(getUser({error}));
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.post('/api/auth/logout');
        dispatch(removeUser());
        history.push('/login');
    } catch (err) {
        console.error(err);
    }
};

export default function (state = defaultUser, action) {
    switch (action.type) {
        case GET_USER:
            return action.user;
        case REMOVE_USER:
            return defaultUser;
        default:
            return state;
    }
}
