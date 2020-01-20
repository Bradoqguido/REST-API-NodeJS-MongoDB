const express = require('express');
const bodyParser = require('body-parser');

// create the "app"
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// pass the app for the controllers
require('./controllers/authController')(app);

// roteamento
// app.get('/', (req, res) => {
//  res.send('OK')
// });

app.listen(3000);
