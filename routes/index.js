const router = require("express").Router();
const axios = require("axios");
require('dotenv').config();
// const keys = require("../keys.js");


router
    .get("/scrapeTopBets", (req,res,next)=> {
        console.log(req)
        axios.get("http://www.vegasinsider.com/top-betting-trends/").then(function(response) {  
            const $ = cheerio.load(response.data);
            const topBetsTableData = $("td.viCellBg1, td.viCellBg2")
            const results = [];
            topBetsTableData.each(function(i, element) {
                const data = $(this).text()
                results.push(data);
            })
            const bets = []
            for (let i = 0; i < results.length; i += 8) {
                const bet = {
                    rank: results[i],
                    league: results[i + 1],
                    rotation: results[i + 2],
                    team: results[i + 3],
                    type: results[i + 4],
                    betOnlineCurrentLine: results[i + 5],
                    ceasarsCurrentLine: results[i + 6],
                    lvhCurrentLine: results[i + 7]
                }
                bets.push(bet)
            }
            res.send(bets)
        })
    })

router.get((req,res,next)=>{
  res.sendStatus(404)})
