const express = require("express");
const app = express();

app.use(express.json());
app.use("/pedidos", require("./rotas"));

app.get("/", (req, res) => {
  res.send("Order Service funcionando");
});

app.listen(3003, () => {
  console.log("Order Service rodando em http://localhost:3003");
});
