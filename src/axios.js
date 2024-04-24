import axios from "axios";

// export const Axios = axios.create({
//     baseURL:`${process.env.REACT_APP_HOST_URL}:8000/`,
// });


export const apiUrl = `http://${process.env.REACT_APP_HOST_URL}:8000/`;

// const frontendUrl = 'http://localhost:3000';


async function Axios(url, method, data, token, file) {

    try {
        console.log("token", process.env.REACT_APP_HOST_URL);
        const headers = {}
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
            // headers['Content-Type'] = 'application/json'
            // headers['Access-Control-Allow-Origin'] = "*"
        }
        if (file) {
            // headers['Authorization'] = `Bearer ${token}`
            headers['Content-Type'] = 'multipart/form-data'
        }
        else {
            headers['Content-Type'] = 'application/json'
            // headers['Access-Control-Allow-Origin'] = "*"
            // headers['Accept'] = "*"
        }
        const response = await axios.request({
            method: method,
            url: apiUrl + url,
            data: data,
            headers: headers
        });
        console.log("Axios response", response);
        return response;
    } catch (error) {
        console.warn("Axios Error", error);
        if (error?.response?.status === 401) {
            //console.log("Authorizated");
            // document.cookie = `bearerToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        }
        return error;

    }
}
export default Axios


