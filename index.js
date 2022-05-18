const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.TODO_USER}:${process.env.TODO_PASS}@cluster0.j141a.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const todosCollection = client.db("todoApp").collection("todos");
    //get todos api
    app.get("/todos", async (req, res) => {
      const result = await todosCollection.find().toArray();
      res.send(result);
    });

    // post todos api
    app.post("/todos", async (req, res) => {
      const todo = req.body;
      const result = todosCollection.insertOne(todo);
      res.send(result);
    });

    // delete todos api
    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await todosCollection.deleteOne(query);
      res.send(result);
    });

    // update todos api
  } finally {
    //   client.close();
  }
}

run().catch(console.dir);

//root api
app.get("/", (req, res) => {
  res.send("Todos appliciton running");
});
//port listent
app.listen(port, () => {
  console.log(`Todos server running ${port}`);
});
