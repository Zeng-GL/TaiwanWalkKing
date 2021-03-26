const express = require("express");
const bodyParser = require("body-parser");
// const session = require('express-session');
const cors = require('cors');
const app = express();
const path = require('path');
// const router = express.Router();
const flash = require('express-flash');


app.use(cors())



// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());


app.use(express.static('walk_game_server/dist'))
app.use(express.static('public'));
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.get('/signup', function (request, response) {
  response.sendFile(path.join(__dirname + '/public/signup.html'));
});

//include routes 
require('./Taiwan-Walk-Api/app/routes/user.routes.js')(app);
require('./Taiwan-Walk-Api/app/routes/walk.routes')(app);
require('./Taiwan-Walk-Api/app/routes/record.routes')(app);
require('./Taiwan-Walk-Api/app/routes/Fweather.routes')(app);
require('./Taiwan-Walk-Api/app/routes/watch.routes')(app)
require('./Taiwan-Walk-Api/app/routes/backendregister.routes')(app)
require('./Taiwan-Walk-Api/app/routes/backendLogin.routes')(app)

app.listen(3000, () => {
  console.log("CORS-enabled web server listening on port 140.112.30.202:3000");
});
