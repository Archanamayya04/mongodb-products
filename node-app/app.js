const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// Set up the middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define the MongoDB connection URI
const mongoURI = 'mongodb://admin:adminpassword@127.0.0.1:27017/mydb';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve an HTML form for data input
});

app.post('/submit', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('mycollection');

    const { name, email } = req.body;

    await collection.insertOne({ name, email });

    client.close();

    res.redirect('/data'); // Redirect to a page that displays the stored data
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.get('/data', async (req, res) => {
  try {
    const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db();
    const collection = database.collection('mycollection');

    const data = await collection.find({}).toArray();

    client.close();

    res.send(`<h1>Stored Data</h1><pre>${JSON.stringify(data, null, 2)}</pre>`);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

