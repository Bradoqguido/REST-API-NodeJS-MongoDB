const express = require('express');
const bodyParser = require('body-parser');

// cria o app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// passa o app para os outros modulos
require('./controllers/authController')(app);

// roteamento
// app.get('/', (req, res) => {
//  res.send('OK')
// });

app.listen(3000);
