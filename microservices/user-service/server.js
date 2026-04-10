const express = require("express");
const app = express();

const usuarios = [
  { id: 1, nome: "Amanda" },
  { id: 2, nome: "Ze pelit" }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  res.json(usuario);
});

const PORTA = 3001;
app.listen(PORTA, () => {
  console.log(`User Service rodando em http://localhost:${PORTA}`);
});