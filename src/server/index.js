const express = require('express')
const bodyParser = require('body-parser')
const os = require('os');
const http = require('http')

const app = express()
const server = http.createServer(app);
const port = 8080;

app.use(express.static('dist'));

app.get('/', (req, res) => res.send({ username: os.userInfo().username }));


app.listen(process.env.PORT || port, () => console.log(`Listening on port ${process.env.PORT || port}!`))

