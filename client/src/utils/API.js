import axios from 'axios';

export default {
    getTrendingBets: function() {
        return axios.get("/scrapeTopBets")
    },
    getMlbGames: function(req) {
        let day = req.month + "-" + req.day + "-2018"
        return axios.get("/scrapeMLB/" + day)
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
    },
    getArticles: function(searchTerm) {
        return axios.get("/articles/" + searchTerm)
    },
    getBets: function() {
        return axios.get("/api/bets")
    },
    getUsersBets: function(userID) {
        return axios.get('/api/bets/' + userID)
    }
}