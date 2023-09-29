const mongoose = require('mongoose');
const User = require('./User'); 
const Channel = require('./Channel'); 
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: { type: String, required: true },
  from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: Schema.Types.ObjectId, ref: 'User' },
  toChannel: { type: Schema.Types.ObjectId, ref: 'Channel' },
  createdAt: { type: Date, default: Date.now },
});

messageSchema.pre('save', async function (next) {
  if (this.toUser) {
    const userExists = await User.findById(this.toUser);
    if (!userExists) {
      return next(new Error('Referenced user does not exist.'));
    }
  }

  if (this.toChannel) {
    const channelExists = await Channel.findById(this.toChannel);
    if (!channelExists) {
      return next(new Error('Referenced channel does not exist.'));
    }
  }

  next();
});

module.exports = mongoose.model('Message', messageSchema);