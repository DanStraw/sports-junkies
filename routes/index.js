const router = require("express").Router();
const axios = require("axios");
require('dotenv').config();
// const keys = require("../keys.js");
const cheerio = require("cheerio");

router
    .get("/scrapeTopBets", (req,res,next)=> {
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
                    lvhCurrentLine: results[i + 7],
                    key: Math.floor(Math.random() * 100000000000)
                }
                bets.push(bet)
            }
            res.send(bets)
        })
    })
    .get("/scrapeMLB", function(req,res) {
        const games = [];
        axios.get("http://www.vegasinsider.com/mlb/scoreboard/").then(function(response) {
            const $ = cheerio.load(response.data);
            const gameTable = $("tbody")
            const oddsInfo = [];
            gameTable.each(function(i, element) {
                const row = $(this).children("tr.tanBg")
                row.each(function(i, element) {
                    const teamData = {
                        team: $(this).children("td.sportPicksBorderL2, td.sportPicksBorderL").children("b").children("a.black").text(),
                    }
                    const data = [];
                    const stat = $(this).children("td.sportPicksBorderL2, td.sportPicksBorderL")
                    stat.each(function(i, element) {
                        const info = $(this).text()
                        const infoArray = info.split("");
                        switch (info) {
                            case "" :
                                break;
                            default:
                                data.push(info)
                                break;
                        }
                        
                    })
                    teamData.moneyLine = data[2];
                    teamData.overUnder = data[3];
                    oddsInfo.push(teamData);
                })
            })
            for (i = 0; i < oddsInfo.length; i+=2) {
                games.push({
                    team1: oddsInfo[i],
                    team2: oddsInfo[i + 1],
                    key: Math.floor(Math.random() * 100000000000)
                })
            }
            res.send(games)
        })
    })
    .get("/seasonOdds/:league", function(req,res,next) {
        axios.get("http://www.vegasinsider.com/" + req.params.league + "/odds/futures/").then(function(response) {
            const $ = cheerio.load(response.data);
            const descriptions = $("div.viHeaderNorm")
            let oddsInfo = [];
            descriptions.each(function(i, element) {
                switch (i) {
                    case 0:
                        oddsInfo.push($(this).text());
                        break;
                    default:
                        break;
                }    
            })
            
            const teamRows = $("table.table-wrapper").children("tbody").children("tr.viCellBg1, tr.viCellBg2")
            teamRows.each(function(i, element) {
                if (i <= 31) {
                    const team = {
                        name: $(this).children("td.font-bold").text(),
                        odds: $(this).children("td.last").text(),
                        key: Math.floor(Math.random() * 100000000000)
                    }
                    oddsInfo.push(team);
                }  
            })
            res.send(oddsInfo)
        })
    })

router.get((req,res,next)=>{
  res.sendStatus(404)})

module.exports = router;
