# ImplementacaoPratica

Projeto simples para comparar monólito e microserviços com API Gateway.

## Estrutura
- `monolito/`
- `microservices/user-service/`
- `microservices/product-service/`
- `microservices/order-service/`
- `microservices/gateway/`

## Instalar
Em cada pasta com `package.json`:

```bash
npm install
```

## Rodar o monólito
```bash
cd monolito
npm start
```

## Rodar os microserviços
```bash
cd microservices/user-service && npm start
cd microservices/product-service && npm start
cd microservices/order-service && npm start
cd microservices/gateway && npm start
```

## Rotas principais
### Monólito
- `GET /usuarios`
- `GET /usuarios/:id`
- `POST /usuarios`
- `GET /produtos`
- `GET /produtos/:id`
- `POST /produtos`
- `GET /pedidos`
- `GET /pedidos/:id`
- `POST /pedidos`
- `GET /pedidos/detalhados`

### Gateway
- `GET /api/usuarios`
- `GET /api/usuarios/:id`
- `POST /api/usuarios`
- `GET /api/produtos`
- `GET /api/produtos/:id`
- `POST /api/produtos`
- `GET /api/pedidos`
- `GET /api/pedidos/:id`
- `POST /api/pedidos`
- `GET /api/pedidos-detalhados`
