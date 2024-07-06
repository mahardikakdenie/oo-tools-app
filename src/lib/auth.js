import axios from "axios";

// const endpoint = 'http://localhost:8081/auth/login/'
const endpoint = `${import.meta.env.VITE_API_URL}/auth/login/`
export const login = (params, callback, errCb) => {
    axios.post(endpoint, params)
        .then(res => {
            if (callback) callback(res);
        }).catch(e => {
            if (errCb) errCb(e);
        })
};
