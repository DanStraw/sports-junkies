import axios from 'axios';

export default {
    getTrendingBets: function() {
        return axios.get("/api/scrape/topBets")
    },
    getMlbGames: function(req) {
        let day = req.month + "-" + req.day + "-2018"
        return axios.get("/api/scrape/mlb/" + day)
    },
    getSeasonOdds: function(league) {
        return axios.get("/api/scrape/seasonOdds/" + league)
    },
    saveUser: function(userData) {
        return axios.post("/api/users", userData);
    },
    saveBet: function(betData, id) {
        console.log(betData, id)
        return axios.post("/api/bets/", {betData, id})
    },
    getTweets: function(account) {
        return axios.get("/api/tweets/" + account)
    },
    getArticles: function(searchTerm) {
        return axios.get("/api/articles/" + searchTerm)
    },
    getBets: function() {
        return axios.get("/api/bets/")
    },
    getUsersBets: function(id) {
        console.log('api get bets for:', id)
        return axios.get("/api/bets/usersBets/" + id)
    },
    saveSeasonBet: function(team) {
        return axios.post('/api/bets/seasonBet', team)
    },
    getUser: function() {
        return axios.get('/auth/user')
    }
}