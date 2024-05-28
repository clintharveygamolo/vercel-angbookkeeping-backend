import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vercel-angbookkeeping-backend.onrender.com'
});
export default instance;
