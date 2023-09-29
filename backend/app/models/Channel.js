const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ChannelSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

ChannelSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Channel', ChannelSchema);