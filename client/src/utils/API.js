import axios from 'axios';

export default {
    getTrendingBets: function() {
        return axios.get("/scrapeTopBets")
    },
    getMlbGames: function() {
        return axios.get("/scrapeMLB")
    },
    getSeasonOdds: function(league) {
        console.log('league:', league)
        return axios.get("/seasonOdds/" + league)
    }
}