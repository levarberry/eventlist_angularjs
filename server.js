var express = require('express');
var app = express();
var mongojs = require('mongojs');

var db = mongojs('eventlists',['ss_events']);

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/eventlist', function (req, res) {
  db.ss_events.find(function (err, docs) {
       res.json(docs);
  });
});

app.post('/eventlist', function (req, res) {
     db.ss_events.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/eventlist/:id', function (req, res) {
  var id = req.params.id;
  //console.log(id);
  db.ss_events.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/eventlist/:id', function (req, res) {
  var id = req.params.id;
 // console.log(id);
  db.ss_events.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/eventlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body);
  db.ss_events.findAndModify({
    query: {_id:  mongojs.ObjectId(id)},
    update: {$set: {url: req.body.url, title: req.body.title, dateiso: req.body.dateiso,
                   location:req.body.location, details:req.body.details,
                   address: req.body.address,
                   map: req.body.map }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);

Select Distinct  FROM 
WHERE bucketdate = 

<asp:dropdownlist id="fltrFabric100" runat="server" DataSourceID="sqlFabric100">

</asp:dropdownlist>