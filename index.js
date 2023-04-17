// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});





app.get("/api/:date?", (req, res) => {

  console.log(req.params);

  let unix = 0;
  let utc = "";
  let date;

  if (typeof req.params.date == "undefined") {

    date = new Date();
    console.log("returning: ", {
      unix: Date.now(),
      utc: date.toUTCString()
    });
    return res.json({
      unix: Date.now(),
      utc: date.toUTCString()
    });
  } else {
    
    date = new Date(req.params.date);
  
    if (date instanceof Date && !isNaN(date)) {
      // valid date
  
      console.log("returning: ", {
        unix: date.getTime(),
        utc: date.toUTCString()
      });
      return res.json({
        unix: date.getTime(),
        utc: date.toUTCString()
      });
    } else {
      unix = parseInt(req.params.date);
      date = new Date(unix);
      if (date instanceof Date && !isNaN(date)) {
        // valid date (unix)

        console.log("returning: ", {
          unix: unix,
          utc: date.toUTCString()
        });
        return res.json({
          unix: unix,
          utc: date.toUTCString()
        });
      } else {
        console.log("not a valid date");
        res.json({error: "Invalid Date"})
      }
    }
  }
});