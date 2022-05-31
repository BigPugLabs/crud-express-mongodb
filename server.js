// imports
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

// globals
const app = express()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 8000
const DB_NAME = process.env.DB_NAME || "rickyisms"
const DB_CONNECTION = process.env.DB_CONNECTION || "mongodb://127.0.0.1:27017/"

// server message
console.log('Avengers of the Nerds')

// Setup DB
MongoClient.connect(DB_CONNECTION)
    .then(client => {
        console.log("Connected to DB")
        const db = client.db(DB_NAME)
        const quotesCollection = db.collection("quotes")

        // template engine
        app.set('view engine', 'ejs')

        // middleware
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        // handlers
        // renders default page
        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    res.render('index.ejs', { quotes: results })
                })
                .catch(error => console.error(error))
        })
        // adds data to DB
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    //console.log(result)
                    res.redirect('/')
                })
                .catch(error => console.error(error))
        })
        // replaces quote with data from browser JS
        app.put('/quotes', (req, res) => {
            quotesCollection.findOneAndUpdate(
                { name: "Ricky" },
                {
                    $set: {
                        name: req.body.name,
                        quote: req.body.quote
                    }
                },
                {
                    upsert: true
                }
            )
                .then(result => {
                    res.json("Success")
                    console.log(result)
                })
                .catch(error => console.error(error))
        })
        // delete based on browser data (!)
        app.delete('/quotes', (req, res) => {
            quotesCollection.deleteOne(
                { name: req.body.name }
            )
            .then(result => {
                if (result.deletedCount == 0) {
                    return res.json('No quote to delete')
                }
                res.json('Deleted Lahey quote')
            })
            .catch(error => console.error(error))
        })

        // server start
        app.listen(PORT, () => console.log(`listening on ${PORT}`))
    })
    .catch(error => console.error(error))

// Handlers
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })
// app.post('/quotes', (req, res) => {
//     console.log(req.body)
// })