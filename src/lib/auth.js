import axios from "axios";
import client from "./http-client";

// const endpoint = 'http://localhost:8081/auth/login/'
const endpoint = `${import.meta.env.VITE_API_URL}/auth`
export const login = (params, callback, errCb) => {
    const url = `${endpoint}/login`
    axios.post(url, params)
    .then(res => {
        if (callback) callback(res);
    }).catch(e => {
        if (errCb) errCb(e);
    })
};

export const getMe = (params, callback, errCb) => {
    const url = `${endpoint}/me`
    client.get(url, {params})
        .then(res => {
            if (callback) callback(res);
        }).catch(e => {
            if (errCb) errCb(e);
        })
};
