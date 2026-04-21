const express = require("express");
const app = express();

app.use(express.json());
app.use("/produtos", require("./rotas"));

app.get("/", (req, res) => {
  res.send("Product Service funcionando");
});

app.listen(3002, () => {
  console.log("Product Service rodando em http://localhost:3002");
});
