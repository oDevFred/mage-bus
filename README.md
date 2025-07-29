# 🚌 Mage-Bus

Sistema completo para **gerenciamento de frotas de ônibus**, incluindo módulos para administradores, motoristas, central de controle e passageiros. Seu principal objetivo é otimizar a operação e o monitoramento de uma empresa de transporte por meio de geolocalização em tempo real e gerenciamento centralizado.

---

## 📑 Tabela de Conteúdos

- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação](#️-como-rodar-o-projeto)
- [Exemplos de Uso](#-exemplos)
- [Roadmap](#️-roadmap-próximos-passos)
- [Contribuidores](#-contribuidores)
- [Licença](#-licença)

---

## 🚀 Tecnologias Utilizadas

### Backend (Node.js + Express + MongoDB)

- **Node.js**, **Express.js** – API RESTful.
- **TypeScript** – Tipagem estática.
- **Mongoose** – ODM para MongoDB.
- **JWT**, **Bcrypt** – Autenticação e segurança.
- **Dotenv**, **CORS**, **ts-node**, **Nodemon**.

### Frontend

- **HTML5 / CSS3**, **Bootstrap**, **Bootstrap Icons**
- **JavaScript (Vanilla JS)**
- **Leaflet.js** – Mapeamento interativo.

### Outros

- **Docker** e **Docker Compose**
- **MongoDB** (Local ou Atlas)

---

## ✨ Funcionalidades

- **Login seguro com JWT**
- **Painel Administrativo** com gerenciamento de ônibus e usuários
- **Painel Central de Controle** com monitoramento via mapa
- **Painel do Motorista** com atualização de localização/status
- **Geolocalização em tempo real**
- **Módulo em desenvolvimento para passageiros**

---

## 📂 Estrutura do Projeto

```
mage-bus/
├── backend/                  # Servidor Node.js (API REST)
│   ├── src/
│   │   ├── controllers/      # Lógica de rotas
│   │   ├── middlewares/      # Autenticação, logs, etc.
│   │   ├── models/           # Schemas do Mongoose
│   │   ├── routes/           # Rotas Express
│   │   └── app.ts            # Arquivo principal
│   ├── .env.example          # Variáveis de ambiente exemplo
│   ├── package.json          # Dependências backend
│   └── tsconfig.json
│
├── frontend/                 # Interface Web
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── central-controle/
│   │   │   ├── motorista/
│   │   │   └── passageiro/
│   │   └── index.html
│   └── package.json
│
├── docker-compose.yml        # Orquestração Docker
├── .gitignore
└── README.md
```

---

## ⚙️ Como Rodar o Projeto

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) e [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (opcional, mas recomendado)
- [MongoDB](https://www.mongodb.com/) local ou remoto (Atlas)

### 🔄 Modo 1: Executar com Docker (recomendado)

```bash
docker-compose up --build
```

- O backend ficará disponível em `http://localhost:3000`
- O banco de dados MongoDB estará em `localhost:27018`

### 🔄 Modo 2: Manual (sem Docker)

1. **Clone o projeto e entre na pasta:**

```bash
git clone https://github.com/oDevFred/mage-bus.git
cd mage-bus/backend
```

2. **Crie o arquivo `.env` com base em `.env.example`:**

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/magebus_db
JWT_SECRET=seuSegredoJWTSuperSeguroAqui
JWT_EXPIRE=1h
```

3. **Instale as dependências e rode o servidor:**

```bash
npm install
npm run dev
```

4. **Abra o frontend:**

Abra o arquivo `frontend/src/index.html` diretamente ou use o Live Server (VS Code).

---

## 🧪 Exemplos

- Acesse `/admin` no frontend para gerenciar ônibus e motoristas.
- Os motoristas enviam coordenadas via painel e isso é refletido em tempo real na central.
- A comunicação entre backend e frontend usa REST APIs via `fetch()`.

---

## 🗺️ Roadmap (Próximos Passos)

- 🔲 Implementar módulo do passageiro
- 🔲 Dashboards mais interativos
- 🔲 Testes automatizados
- 🔲 Upload de imagens dos ônibus
- 🔲 Validação robusta no frontend/backend

---

## 👥 Contribuidores

| Nome                         | Contato                              |
|------------------------------|---------------------------------------|
| Caio Eduardo Ferreira Frederico | caio.frederico2001@outlook.com     |

---

## 📄 Licença

Este projeto é de **uso restrito**.

> Todos os direitos reservados © 2025 Caio Eduardo Ferreira Frederico.  
> Reutilização, redistribuição ou modificação **sem autorização expressa por escrito é proibida**.