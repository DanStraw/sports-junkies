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
    getUsersBets: function() {
        return axios.get('/api/usersbets/')
    },
    setID: function(id) {
        return axios.post('/api/id/', id)
    },
    saveSeasonBet: function(team) {
        return axios.post('/api/seasonBet', team)
    },
    googleLogin: function(){
        return axios.get("/auth/google")
    }
}