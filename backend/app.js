//  ---------------------------- server/app.js
// declarations
require('dotenv').config()
const {ENVIRONMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const collectionsRoutes = require('./routes/collections');

const app = express();

// middleware setup
app.use(morgan(ENVIRONMENT));
app.use(bodyParser.json());

app.use('/collection', collectionsRoutes);

app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));