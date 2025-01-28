import axios from 'axios'

const api = axios.create({
baseURL: 'https://unitdecom.unitdtechnologies.com:3006',
// baseURL: 'http://localhost:3000',
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api