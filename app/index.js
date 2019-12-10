var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/beerCollection";
MongoClient.connect(url, function(err, client) {
  console.log("Connected correctly to MongoDB server.");
  client.close();
});

app.get("/", function(req, res) {
  console.log("Received request from", req.ip);
  res.send("Hello World!");
});

// app.get("/beers", function(req, res) {
//   console.log("Received request for beers from", req.ip);
//   res.json(beerList);
// });

app.get("/beers", async function(req, res) {
  console.log("Received request for beers from", req.ip);
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('beerCollection');
    var beerList = await db
      .collection("beers")
      .find()
      .toArray();
    res.json(beerList);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
});

// app.get("/beer/:beerId", function(req, res) {
//   console.log("Received request for " + req.params["beerId"] + " from", req.ip);
//   var beerDetails = require("./beers/" + req.param("beerId") + ".json");
//   res.json(beerDetails);
// });

app.get("/beer/:beerId", async function(req, res) {
  console.log(`Received request for ${req.params.beerId} from ${req.ip}`);
  let client;
  try {
    client = await MongoClient.connect(url);
    const db = client.db('beerCollection');
    let beerId = req.params.beerId;
    let beerList = await db
      .collection("beers")
      .find({ id: beerId })
      .toArray();
    let beer = beerList[0];
    console.log(beer);
    res.json(beer);
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
});

app.use("/beers/img", express.static("beers/img"));   
app.use(express.static("public"));

//var beerList = require("./beers/beers.json");

var server = app.listen(3000, function() {
  var host = "localhost" || server.address().address;
  var port = server.address().port;
  console.log("Listening at http://%s:%s/app", host, port);
});