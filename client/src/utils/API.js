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
    saveBet: function(betData) {
        return axios.post("/api/bets", betData)
    },
    getTweets: function(account) {
        return axios.get("/tweets/" + account)
    }
}