import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.github.com/repos/facebook/create-react-app/'
});
