const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const tweetSchema = require('../models/tweet');
const Pusher = require('pusher');
try {
    require('dotenv').config()
} catch(e){
    console.log('\x1b[31m', `Error with your configuration, make sure that you visit the .env file and provide the right values, e: ${e}`)
}
// MongoDB URL stored in .env and similar to the one in the docker-compose file
const dbHost = process.env.DB_HOST;

// Connect to mongodb
mongoose.connect(dbHost);


// create mongoose models
const Tweet = mongoose.model('Tweet', tweetSchema);

// pusher for publish data to the client in real time mode

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
});

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});

/* Create a tweet. */
router.post('/tweets', (req, res) => {
    let tweet = new Tweet({
        id: req.body.id,
        message: req.body.message,
        date: req.body.date
    })

    tweet.save(error => {
        if(error) res.status(500).send(error)

        res.status(201).json({
            message: 'Tweet created successfully'
        });
    });
});

/* Get all tweets. */
router.get('/tweets', (req, res) => {
    Tweet.find({}, null, {sort: '-date'}, (err, tweets) => {
        if(err) res.status(500).send(error)

        res.status(200).json(tweets);
    })
})

let findTweet = (id) => {
    return new Promise ((resolve, reject) => {
        Tweet.findOne({id: id}, (err, tweet) => {
            if(err){
                console.log(`Error when call findTweet: ${err}`);
                resolve(null)
            }
            resolve(tweet)
        });
    }).then(console.resolve)
        .catch(console.error)

}

let findTweets = () => {
    return new Promise ((resolve, reject) => {
        Tweet.find({}, null, {sort: '-date'}, (err, tweets) => {
            if(err){
                console.log(`Error when call findTweets: ${err}`);
                resolve([])
            }
            resolve(tweets)
        });
    }).then(console.resolve)
        .catch(console.error)
}

let saveTweet = (myTweet) => {
    let tweet = new Tweet({
        id: myTweet.id,
        message: myTweet.message,
        date: new Date(myTweet.date)
    })

    return new Promise ((resolve, reject) => {
        tweet.save(err => {
            if(err){
                console.log(`Error when save tweet of id(${twt.id}): ${err}`);
                resolve(true)
            }
            resolve(true)
        });
    }).then(console.resolve)
        .catch(console.error)
}

let pushTweets = async () => {
    let myTweets = await findTweets();
    pusher.trigger('tweets', 'newTrigger', {
        "tweets": myTweets
    });
}

module.exports = {
    router,
    findTweet,
    findTweets,
    saveTweet,
    pushTweets
}
