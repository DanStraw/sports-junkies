import axios from 'axios';

export default {
    getTrendingBets: function() {
        return axios.get("/scrapeTopBets")
    },
}