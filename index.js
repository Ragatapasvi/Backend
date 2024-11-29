import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors"
const uri = "mongodb+srv://ragatapasvip:Vg19Z8oZYPn7BoCM@cluster0.pg8cn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const db = client.db("ecomm");

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
  console.log("Server started at port 8080");
});
const usr = encodeURIComponent("username")
const pwd = encodeURIComponent("password")

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.get("/", async (req, res) => {
  const items = await db.collection("products").find().toArray();
  res.status(200).json(items);
});

app.post("/", async (req, res) => {
  const { name, price, desc, url } = req.body;
  const data = {
    name: name,
    price: price,
    desc:desc,
    url:url
  };
  const newProduct = await db.collection("products").insertOne(data);
  res.status(200).json(newProduct);
});


app.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
    res.status(200).json(newProduct);
  });
  