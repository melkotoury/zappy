module.exports = {
    integrate(){


        const {slack , twitter} = require('../config');

        let slackCred = slack || {};
        let twitterCred = twitter || {};

        // slack
        const {RTMClient} = require('@slack/client');
        // The client is initialized and then started to get an active connection to the platform
        const rtm = new RTMClient(slack.botToken);




        // twitter
        const Twitter = require('twitter');
        const client = new Twitter({
            consumer_key: twitterCred.consumer_key,
            consumer_secret: twitterCred.consumer_secret,
            access_token_key: twitterCred.access_token_key,
            access_token_secret: twitterCred.access_token_secret
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
