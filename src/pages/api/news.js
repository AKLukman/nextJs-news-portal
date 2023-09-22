const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://news-portal:j5e49SJwHPLcYaBM@cluster0.tdvhb.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  try {
    await client.connect();
    const newsCollections = await client.db("news_portal").collection("news");

    if (req.method === "GET") {
      const news = await newsCollections.find({}).toArray();
      res.send({ message: "success", status: 200, data: news });
    }

    if (req.method === "POST") {
      const news = req.body;
      const result = await newsCollections.insertOne(news);
      res.json(result);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
export default run;
