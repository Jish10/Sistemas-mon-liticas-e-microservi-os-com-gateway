const express = require("express");
const app = express();

app.use(express.json());
app.use("/api", require("./rotas"));

app.get("/", (req, res) => {
  res.send("Gateway funcionando");
});

app.listen(3000, () => {
  console.log("Gateway rodando em http://localhost:3000");
});
