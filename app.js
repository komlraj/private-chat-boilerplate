const express = require('express');
const session = require('express-session');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

const port = 1234;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

if(process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(cors());

app.use('/api', require('./server/routes/api'));
app.use(require('./server/routes/index'));

var userSocketIds = {};

server = app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

const io = socket(server);

io.on('connection', (socket) => {

  socket.on('ONLINE', function(data) {
    userSocketIds[data.userId] = socket.id;
    console.log( userSocketIds, "online userSocketId")
  });


  const PrivateMessage = require('./server/models/PrivateMessage');
  socket.on('SEND_PRIVATE_MESSAGE', function(data) {
    const newPrivateMessage = new PrivateMessage(data);
    let findedDataArr = [];
    newPrivateMessage.save((err, data) => {
      if (err) throw err;
      else {
        PrivateMessage.find({ $and: [
            {$or: [{toUser: data.toUser}, {fromUser: data.toUser}]}, 
            {$or: [{toUser: data.fromUser}, {fromUser: data.fromUser}]} 
          ]}, (err, data)=> {
          if (!err) findedDataArr = data;
          console.log(findedDataArr, "private message data after saving in mongoode");
          io.emit('RECEIVE_PRIVATE_MESSAGE', findedDataArr);
        });
        
      }
    });

  })
});