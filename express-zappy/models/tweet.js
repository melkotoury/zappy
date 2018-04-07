const tweetSchema = new mongoose.Schema({
    id: String,
    message: String,
    date: Date
});

module.exports = {
    tweetSchema
}