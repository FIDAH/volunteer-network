const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



const MongoClient = require('mongodb').MongoClient;

const port = 5000

app.use(cors());
app.use(bodyParser.json());


// const pass ="volunteer3389"
// username= 'volunteer'


const uri = "mongodb+srv://volunteer:volunteer3389@cluster0.3dork.mongodb.net/volunteerNetwork?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const workCollection = client.db("volunteerNetwork").collection("works");
  
    app.post('/addWorks', (req, res)=> {
        const newWork = req.body;
        workCollection.insertOne(newWork)
        .then(result => {
            res.send(result.insertedCount > 0);
        })
    } )

    app.get('/selectedWorks', (req, res) =>{
        workCollection.find({email:req.query.email})
        .toArray((err, documents) =>{
            res.send(documents);
        })
    })

    app.get('/allselectedWorks', (req, res) =>{
        workCollection.find({})
        .toArray((err, documents) =>{
            res.send(documents);
        })
    })



});


app.get('/', (req, res) => {
  res.send('Hello World! here we go')
})

app.listen(port);