module.exports = {
    integrate(){

        //config data
        try {
            require('dotenv').config()
        } catch(e){
            console.log('\x1b[31m', `Error with your configuration, make sure that you visit the .env file and provide the right values, e: ${e}`)
        }
        const slack = {
            botToken: process.env.SLACK_BOT_TOKEN,
            marketChannels: process.env.SLACK_MARKET_CHANNELS
        }


        let slackCred = slack || {};

        // slack
        const RtmClient = require('@slack/client').RtmClient;
        const rtm = new RtmClient(slackCred.botToken);
        const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

        // twitter
        const Twitter = require('twitter');
        const client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        const _ = require('underscore');

        // Get our API
        const api = require('./../routes/api.js');

        rtm.start();


        rtm.on(RTM_EVENTS.MESSAGE, function(message) {
            let text = message.text? message.text.replace(/[^a-zA-Z ]/g, ""): ''
            text = text? ` ${text} `:''
            if(_.contains(slackCred.marketChannels, message.channel) && text && /\sgo\s/i.test(text)){
                // call twitter api for fetching data
                client.get('statuses/user_timeline', {count: 200}, async function(error, tweets, response) {
                    let tweetsLen = tweets.length;
                    if (!error) {
                        for(let index = 0; index < tweetsLen; index++){
                            let tweet = tweets[index];
                            let twt = await api.findTweet(tweet.id_str);
                            if(!twt){
                                let tweetSaved = await api.saveTweet({id: tweet.id_str, text: tweet.text, date: tweet.created_at});
                                // push tweets to the client after be updated
                                if(tweetSaved && index == tweetsLen - 1){
                                    api.pushTweets();
                                }
                            } else {
                                // push tweets to the client after be updated
                                if(index == tweetsLen - 1){
                                    api.pushTweets();
                                }
                            }
                        }
                    }
                });
            }
        });
    }
}
