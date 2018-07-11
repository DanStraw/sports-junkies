import axios from 'axios';

export default {
    getTrendingBets: function() {
        return axios.get("/scrapeTopBets")
    },
    getMlbGames: function() {
        return axios.get("/scrapeMLB")
    },
    getSeasonOdds: function(league) {
        return axios.get("/seasonOdds/" + league)
    },
    saveUser: function(userData) {
        return axios.post("/api/users", userData);
    },
    getTweets: function(account) {
        return axios.get("/tweets/" + account)
    }
}