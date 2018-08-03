const router = require("express").Router();
const userController = require("../../controllers/usersController.js")
const betController = require("../../controllers/betsController.js");
var Twitter = require('twitter')
const keys = require('../../keys.js')
var client = new Twitter(keys.twitter);
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(keys.foxnews.id);
const userRoutes = require('./users')
const betRoutes = require('./bets')
const scrapeRoutes = require('./scrape')

router
    .get("/tweets/:account", function(req,res,next) {
        var params = {screen_name: req.params.account};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (error) {
                console.log('error:', error);
                throw error;
            }
            if (!error) {
                twits = [];
                for (let i = 0; i < 5; i++) {
                    let listing = i + 1;
                    const t = tweets[i];
                    let twit = {};
                    switch (t.entities.media) {
                        case undefined:
                            twit = {
                                number: listing,
                                account: '@' + t.user.screen_name,
                                text: t.text,
                                created: t.created_at.slice(0,19),
                            }
                            break;
                        default:
                            twit = {
                                number: listing,
                                account: '@' + t.user.screen_name,
                                avatar: t.user.profile_image_url,
                                text: t.text,
                                created: t.created_at.slice(0,19),
                                image: t.entities.media[0].media_url
                            }
                        break;
                    }
                    twits.push(twit)
                }
                res.send(twits);
            }    
        })
    })
    .get("/articles/:searchTerm", function(req,res,next) {
        newsapi.v2.everything({
            q: req.params.searchTerm,
            sortBy: 'publishedAt',
            pageSize: 5,
            }).then(response => {
            let articles = [];
            response.articles.map(article => {
                let pubDate = article.publishedAt;
                pubDate = pubDate.slice(0, 10)
                const articleInfo = {
                    title: article.title,
                    author: article.author,
                    description: article.description,
                    source: article.source.name,
                    url: article.url,
                    image: article.urlToImage,
                    published: pubDate
                }
                articles.push(articleInfo);
            })
            res.send(articles)
        });
    })

router.use('/users', userRoutes);
router.use('/bets', betRoutes)
router.use('/scrape', scrapeRoutes);
    

module.exports = router;