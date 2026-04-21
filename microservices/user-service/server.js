const express = require("express");
const app = express();

app.use(express.json());
app.use("/usuarios", require("./rotas"));

app.get("/", (req, res) => {
  res.send("User Service funcionando");
});

app.listen(3001, () => {
  console.log("User Service rodando em http://localhost:3001");
});
