const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Monólito funcionando");
});

app.use("/usuarios", require("./rotas/usuarios"));
app.use("/produtos", require("./rotas/produtos"));
app.use("/pedidos", require("./rotas/pedidos"));

app.listen(3000, () => {
  console.log("Monólito rodando em http://localhost:3000");
});
