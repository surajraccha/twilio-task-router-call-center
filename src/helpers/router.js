const Router = require("express").Router;
const { tokenGenerator, voiceResponse } = require("./handler");

const router = new Router();

router.get("/token", (req, res) => {
  console.log("token request");
  res.send(tokenGenerator());
});

router.post("/voice", (req, res) => {
  res.set("Content-Type", "text/xml");
  res.send(voiceResponse(req.body));
});

router.post('/task-assignment', (req, res) => {
  const { TaskAttributes, WorkerSid } = req.body;
 console.log(req.body);
  res.status(200).send('Task assignment received');
});

module.exports = router;
