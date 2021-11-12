const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.ha2x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("jewelry_store");
        const jewelry = database.collection("jewelry");
        const ordersCollection = database.collection("orders");
        const reviewCollection = database.collection("review");

        // find all jewelry product from database
        app.get("/jewelry/", async (req, res) => {
            const cursor = await jewelry.find({}).toArray();
            res.send(cursor);
        })

        // Add a newJewelry product to database collection
        app.post('/jewelry/', async (req, res) => {
            const product = req.body;
            const result = await jewelry.insertOne(product);
            res.json(result);
        })

        // find single jewelry product from database
        app.get("/jewelry/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const cursor = await jewelry.findOne(query);
            res.send(cursor);
        })


        // Add order product to database collection
        app.post('/orders/', async (req, res) => {
            const product = req.body;
            const result = await ordersCollection.insertOne(product);
            res.json(result);
        })

        // find all order product from database
        app.get("/allorders/", async (req, res) => {
            const cursor = await ordersCollection.find({}).toArray();
            res.send(cursor);
        })

        // Find my orders from database
        app.get('/orders/', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const order = await ordersCollection.find(query).toArray();
            res.send(order);
        })

        // Delete a Single Order API 
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(quary);
            console.log(result);
        })

        // Delete a Single Product API 
        app.delete('/jewelry/:id', async (req, res) => {
            const id = req.params.id;
            const quary = { _id: ObjectId(id) };
            const result = await jewelry.deleteOne(quary);
            console.log(result);
        })

        // Update booking status
        app.put('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    status: "approved"
                },
            };
            const result = await ordersCollection.updateOne(filter, updateDoc, options);
            // console.log(id);
            res.json(result);
        })


        // Add review to database collection
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.json(result);
        })

        // Find review to database collection
        app.get('/review/', async (req, res) => {
            const result = await reviewCollection.find({}).toArray();
            res.send(result);
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


// pass : yiCEzimhGU8CnaQK

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, (req, res) => {
    console.log("Running with port: " + port);
})