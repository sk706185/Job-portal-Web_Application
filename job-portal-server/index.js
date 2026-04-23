const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://mern-job-portal-website.vercel.app'
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Hello Developer');
});

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const db = client.db('mernJobPortal');
    const jobsCollections = db.collection('demoJobs');
    const applicationsCollection = db.collection('applications');

    app.post('/post-job', async (req, res) => {
      try {
        const body = req.body;
        body.createAt = new Date();
        const result = await jobsCollections.insertOne(body);
        res.status(200).send(result);
      } catch (error) {
        res.status(500).send({ message: 'Failed to post job', error: error.message });
      }
    });

    app.get('/all-jobs', async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });

    app.get('/all-jobs/:id', async (req, res) => {
      const job = await jobsCollections.findOne({ _id: new ObjectId(req.params.id) });
      res.send(job);
    });

    app.get('/myJobs/:email', async (req, res) => {
      const jobs = await jobsCollections.find({ postedBy: req.params.email }).toArray();
      res.send(jobs);
    });

    app.delete('/job/:id', async (req, res) => {
      const result = await jobsCollections.deleteOne({ _id: new ObjectId(req.params.id) });
      res.send(result);
    });

    app.patch('/update-job/:id', async (req, res) => {
      const result = await jobsCollections.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { ...req.body } },
        { upsert: false }
      );
      res.send(result);
    });

    app.post('/job/:id', async (req, res) => {
      try {
        const { resumeLink, email, name } = req.body;
        const application = {
          jobId: req.params.id,
          resumeLink,
          email,
          name,
          appliedAt: new Date()
        };
        const result = await applicationsCollection.insertOne(application);
        res.send({ message: 'Application submitted successfully!', result });
      } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
      }
    });

    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
}

run();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
