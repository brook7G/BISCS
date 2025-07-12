// This is where we configure our database
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = `mongodb+srv://birukefekadu632:birukewengel633@cluster0.jsd6pqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const conn = await mongoose.connect(MONGO_URI, {
      family: 4,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;


// public key = `hgcrflzr`
// private key = `294a681d-381b-45bc-b3f9-eb642d4e4ddf`


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://birukefekadu632:<biruke@wengeL>@cluster0.jsd6pqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
