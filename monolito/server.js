const express = require("express");
const app = express();

app.use(express.json());

// Dados simples
const usuarios = [
  { id: 1, nome: "Amanda" },
  { id: 2, nome: "Ze pelit" }
];

const produtos = [
  { id: 1, nome: "Laptop", preco: 25000 },
  { id: 2, nome: "Mouse", preco: 500 }
];

const pedidos = [
  { id: 1, usuarioId: 1, produtoId: 2, quantidade: 2 },
  { id: 2, usuarioId: 2, produtoId: 1, quantidade: 1 }
];


app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/produtos", (req, res) => {
  res.json(produtos);
});

app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});


app.get("/pedidos-detalhados", (req, res) => {
  const resultado = pedidos.map((pedido) => {
    const usuario = usuarios.find((u) => u.id === pedido.usuarioId);
    const produto = produtos.find((p) => p.id === pedido.produtoId);

    return {
      id: pedido.id,
      usuario: usuario ? usuario.nome : "Não encontrado",
      produto: produto ? produto.nome : "Não encontrado",
      quantidade: pedido.quantidade,
      precoUnitario: produto ? produto.preco : 0,
      total: produto ? produto.preco * pedido.quantidade : 0
    };
  });

  res.json(resultado);
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Monolito rodando em http://localhost:${PORTA}`);
});