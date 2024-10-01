import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from new repo");
});

app.listen(3000, () => {
  console.log("Server ready at localhost:3000");
});
