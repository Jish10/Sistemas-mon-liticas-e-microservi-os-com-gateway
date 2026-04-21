const express = require("express");
const router = express.Router();
const dados = require("./dados");

router.get("/", (req, res) => {
  console.log("[USER SERVICE] GET /usuarios");
  res.json(dados);
});

router.get("/:id", (req, res) => {
  console.log(`[USER SERVICE] GET /usuarios/${req.params.id}`);
  const item = dados.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ erro: "Registro não encontrado" });
  res.json(item);
});

router.post("/", (req, res) => {
  console.log("[USER SERVICE] POST /usuarios");
  const { nome } = req.body;
  if (!nome) return res.status(400).json({ erro: "Nome é obrigatório" });
  const novo = { id: dados.length + 1, nome };
  dados.push(novo);
  res.status(201).json(novo);
});

module.exports = router;
