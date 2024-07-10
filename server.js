const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const router = require("./src/helpers/router");

// Create Express webapp
const app = express();
app.use(cors("*"));

// app.use(express.static(path.join(__dirname, 'build')));

// // Handles any requests that don't match the ones above
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);

// Create http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log("Express server running on *:" + port);
});
