const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const URL_USUARIOS = "http://localhost:3001";
const URL_PRODUTOS = "http://localhost:3002";
const URL_PEDIDOS = "http://localhost:3003";

// Encaminha usuários
app.get("/api/usuarios", async (req, res) => {
  try {
    const resposta = await axios.get(`${URL_USUARIOS}/usuarios`);
    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// Encaminha produtos
app.get("/api/produtos", async (req, res) => {
  try {
    const resposta = await axios.get(`${URL_PRODUTOS}/produtos`);
    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

app.get("/api/pedidos", async (req, res) => {
  try {
    const resposta = await axios.get(`${URL_PEDIDOS}/pedidos`);
    res.json(resposta.data);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar pedidos" });
  }
});

app.get("/api/pedidos-detalhados", async (req, res) => {
  try {
    const respostaPedidos = await axios.get(`${URL_PEDIDOS}/pedidos`);
    const pedidos = respostaPedidos.data;

    const pedidosDetalhados = await Promise.all(
      pedidos.map(async (pedido) => {
        const respostaUsuario = await axios.get(
          `${URL_USUARIOS}/usuarios/${pedido.usuarioId}`
        );

        const respostaProduto = await axios.get(
          `${URL_PRODUTOS}/produtos/${pedido.produtoId}`
        );

        const usuario = respostaUsuario.data;
        const produto = respostaProduto.data;

        return {
          id: pedido.id,
          usuario: usuario.nome,
          produto: produto.nome,
          quantidade: pedido.quantidade,
          precoUnitario: produto.preco,
          total: produto.preco * pedido.quantidade
        };
      })
    );

    res.json(pedidosDetalhados);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao montar pedidos detalhados" });
  }
});

const PORTA = 3000;
app.listen(PORTA, () => {
  console.log(`Gateway rodando em http://localhost:${PORTA}`);
});