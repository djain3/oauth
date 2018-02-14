let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
const helper = require('./helper.js')

// configuration =================
app.use(express.static(__dirname + '/dist'));

app.use(bodyParser.json());
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 8080);
console.log("App listening on port " + (process.env.PORT || 8080));

app.get('/', function (req, res) {
    res.sendfile('./index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

app.get('/getToken/:code', function (req, res) {
  helper.vkGetToken(req.params.code)
    .then((data)=> {
        res.json(data);
    })
    .catch((err)=> {
        console.log(err);
    })
});

app.get('/getFriends/:uid', function (req, res) {
  helper.vkGetFriends(req.params.uid)
    .then((data)=> {
      res.send(data);
    })
    .catch((err)=> {
      console.log(err);
    })
});

app.get('/isUsed/:uid', function (req, res) {
  helper.isUsed(req.params.uid)
    .then((data)=> {
      res.json(data);
    })
    .catch((err)=> {
      console.log(err);
    })
});