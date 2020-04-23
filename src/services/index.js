import Axios from 'axios';

export const getDataAPI = (root, header) =>{
    const promise = new Promise((resolve, reject) => {
        Axios.get(`${root}`)
        .then((res) => {
            resolve(res.data)
        }).catch((err) => {
            reject(err)
        })
    });
    return promise;
}

export const postDataAPI = (root, header) =>{
    const promise = new Promise((resolve, reject) => {
        Axios.post(`${root}`, header)
        .then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    });
    return promise;
}