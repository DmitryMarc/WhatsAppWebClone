import axios from "axios";

const API_URL = 'https://api.green-api.com/';

export const instanceApi = axios.create({
    baseURL: API_URL
});