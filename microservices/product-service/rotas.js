const express = require("express");
const router = express.Router();
const dados = require("./dados");

router.get("/", (req, res) => {
  console.log("[PRODUCT SERVICE] GET /produtos");
  res.json(dados);
});

router.get("/:id", (req, res) => {
  console.log(`[PRODUCT SERVICE] GET /produtos/${req.params.id}`);
  const item = dados.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ erro: "Registro não encontrado" });
  res.json(item);
});

router.post("/", (req, res) => {
  console.log("[PRODUCT SERVICE] POST /produtos");
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) return res.status(400).json({ erro: "Nome e preço são obrigatórios" });
  const novo = { id: dados.length + 1, nome, preco };
  dados.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
