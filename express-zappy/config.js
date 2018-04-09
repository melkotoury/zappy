try {
    require('dotenv').config();
} catch(e){
    console.log('\x1b[31m', `Error with your configuration, make sure that you visit the .env file and provide the right values, e: ${e}`)
}
const dbHost = process.env.DB_HOST;

const slack = {
    botToken: process.env.SLACK_BOT_TOKEN,
    marketChannels: process.env.SLACK_MARKET_CHANNELS
};

const twitter = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

const pusher = {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    encrypted: true
};

module.exports = {
    dbHost,
    slack,
    twitter,
    pusher
};