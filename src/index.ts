import express from "express";
import userRouter from "./router/userRouter";
import invoiceRouter from "./router/invoiceRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, from new repo");
});

app.use("/user", userRouter);
app.use("/invoice", invoiceRouter);

app.listen(3000, () => {
  console.log("Server ready at localhost:3000");
});
