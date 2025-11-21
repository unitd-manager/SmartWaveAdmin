import axios from 'axios'

const api = axios.create({
baseURL: 'https://smartwaveadmin.unitdtechnologies.com:2016',
//baseURL: 'http://localhost:2015',
});


// const loginApi = axios.create({
//   baseURL: 'https://art-cause.com:3003'
// });


export default api