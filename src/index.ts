import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Hello, this is the template for a REST API with TypeScript and Express!"
  );
});

app.listen(3000, () => {
  console.log("Server ready at localhost:3000");
});
