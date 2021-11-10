const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4200;
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

        app.get("/jewelry/", async (req, res) => {
            const cursor = await jewelry.find({}).toArray();
            res.send(cursor);
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