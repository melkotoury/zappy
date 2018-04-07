const tweetSchema = new mongoose.Schema({
    id: String,
    text: String,
    date: Date
});

module.exports = {
    tweetSchema
}