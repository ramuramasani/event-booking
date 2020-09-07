const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const List = require('./models/list');
const Data = require('./models/data');

const app = express();

mongoose.connect("mongodb+srv://dbUser:dbUser@cluster0.umgw5.mongodb.net/<dbname>?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database');
  })
  .catch(() => {
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.post('/lists', (req, res, next) => {
  const list = new List({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    seats: req.body.seats,
    attendee: req.body.attendee
  });
  list.save();
  res.status(201).json({
    message: 'List added successfully'
  });
});

app.get('/lists',(req, res, next) => {
  List.find()
    .then(documents => {
      res.status(200).json({
        message: 'List fetched successfully',
        lists: documents
      });
    });
});


app.post('/data', (req, res, next) => {
  const data = new Data({
    image: req.body.image,
    availableSeats: req.body.availableSeats
  });
  data.save();
  res.status(201).json({
    message: 'Event data added successfully'
  });
});


app.get('/data',(req, res, next) => {
  Data.find()
    .then(documents => {
      res.status(200).json({
        message: 'events data fetched successfully',
        data: documents
      });
    });
});

app.get('/data/:id',(req, res, next) => {
  let singleEventInfo;
  console.log("req.id",req);
  console.log("param", req.params['id']);
  console.log("req._id", req._id);
  Data.findById(req.params['id'] )
    .then(documents => {
      res.status(200).json({
        message: 'single event data fetched successfully',
        data: documents
      });
    });
});

app.post('/book', (req, res, next) => {
Data.updateOne({_id:req._id}, { $set:{availableSeats:parseInt(availableSeats) - parseInt(req.availableSeats)}}
, function( err, result ) {
  if ( err ) throw err;
})
});

app.delete('/lists/:id', (req, res, next) => {

});

module.exports = app;
