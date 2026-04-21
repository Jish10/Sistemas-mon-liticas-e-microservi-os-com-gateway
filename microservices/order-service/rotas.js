const express = require("express");
const router = express.Router();
const dados = require("./dados");

router.get("/", (req, res) => {
  console.log("[ORDER SERVICE] GET /pedidos");
  res.json(dados);
});

router.get("/:id", (req, res) => {
  console.log(`[ORDER SERVICE] GET /pedidos/${req.params.id}`);
  const item = dados.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ erro: "Registro não encontrado" });
  res.json(item);
});

router.post("/", (req, res) => {
  console.log("[ORDER SERVICE] POST /pedidos");
  const { usuarioId, produtoId, quantidade } = req.body;
  if (!usuarioId || !produtoId || !quantidade) return res.status(400).json({ erro: "usuarioId, produtoId e quantidade são obrigatórios" });
  const novo = { id: dados.length + 1, usuarioId, produtoId, quantidade };
  dados.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
