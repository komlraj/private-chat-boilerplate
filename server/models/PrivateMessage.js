const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PrivateMessageSchema = new Schema({
  toUser: { type: ObjectId, ref: 'User' },
  fromUser: { type: ObjectId, ref: 'User' },
  message: String,
});

const PrivateMessage = mongoose.model('PrivateMessage', PrivateMessageSchema);

module.exports = PrivateMessage;