const PrivateMessage = require('../models/PrivateMessage');

module.exports = {

  privateMessage: (req, res) => {
    const { toUser, fromUser } = req.body;
    PrivateMessage.find({ $and: [
      {$or: [{toUser: toUser}, {fromUser: toUser}]}, 
      {$or: [{toUser: fromUser}, {fromUser: fromUser}]} 
    ]}, (err, data)=> {
    if (!err) res.json(data);
    });
  },

  addPrivateMessage: (req, res) => {
    
  },

};