import axios from 'axios'

export default axios.create(
    {
        baseURL: 'http://157.230.46.55:9005/camelia'
        // baseURL: 'http://10.10.16.128:3456'
        // baseURL: 'http://10.10.16.120:3456'
    }
);

