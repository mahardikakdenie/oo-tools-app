import client from "./http-client";

const endpoint = 'system-logs';
export const getDataSystemData = (params, callback, err) => {
    client.get(endpoint, {params})
    .then(res => {
        if (callback) callback(res);
    }).catch(e => {
        if (err) err(e);
    })
};
