// blacklistModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  // other fields...
});

const Blacklist = mongoose.model('Blacklist', blacklistSchema);
module.exports = Blacklist;
