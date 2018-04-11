module.exports = {
    integrate() {


        const { slack, twitter } = require('../config');

        let slackCred = slack || {};
        let twitterCred = twitter || {};

        // slack
        const { RTMClient, WebClient } = require('@slack/client');
        // The client is initialized and then started to get an active connection to the platform
        const rtm = new RTMClient(slack.botToken);
        const web = new WebClient(slack.botToken);



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
        //TODO make slack listen to "go anything"
        rtm.on('message', (event) => {
            if (event.text === 'go') {
                // call twitter api for fetching data
                client.get('statuses/user_timeline', { count: 200 }, async function(error, tweets, response) {
                    let tweetsLen = tweets.length;
                    if (!error) {
                        for (let index = 0; index < tweetsLen; index++) {
                            let tweet = tweets[index];
                            let twt = await api.findTweet(tweet.id_str);
                            if (!twt) {
                                let tweetSaved = await api.saveTweet({ id: tweet.id_str, text: tweet.text, date: tweet.created_at });

                                web.chat.postMessage({
                                    channel: event.channel,
                                    text: tweet.text ,
                                    attachments: [
                                        {
                                            text: 'This is powered by <https://slack.com|Slack>'
                                        }
                                    ]
                                });
                                // push tweets to the client after be updated
                                if (tweetSaved && index === tweetsLen - 1) {
                                    api.pushTweets();
                                }
                            } else {
                                // push tweets to the client after be updated
                                if (index === tweetsLen - 1) {
                                    web.chat.postMessage({
                                        channel: event.channel,
                                        text: tweet.text ,
                                        attachments: [
                                            {
                                                text: 'This is powered by <https://slack.com|Slack>'
                                            }
                                        ]
                                    });
                                    api.pushTweets();
                                }
                            }
                        }
                    }
                });

            }
        });
        rtm.start();

    }
}