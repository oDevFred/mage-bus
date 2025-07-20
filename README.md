# Mage-Bus: Sistema de Gerenciamento de Transporte Urbano

Este é um projeto em desenvolvimento para um sistema de gerenciamento de transporte urbano, focado em operações de ônibus, passageiros, motoristas e central de controle.

## Tecnologias Utilizadas

* **Backend:** Node.js, Express, TypeScript, Mongoose (MongoDB), JSON Web Tokens (JWT) para autenticação.
* **Frontend:** HTML, CSS (Bootstrap 5), JavaScript puro.
* **Banco de Dados:** MongoDB.

## Estrutura do Projeto

mage-bus/
├── backend/                  # Servidor Node.js (API REST)
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio das rotas (usuários, ônibus)
│   │   ├── middlewares/      # Funções intermediárias (autenticação, autorização)
│   │   ├── models/           # Schemas e modelos do Mongoose (Usuário, Ônibus)
│   │   ├── routes/           # Definição das rotas da API
│   │   └── app.ts            # Ponto de entrada do backend
│   ├── .env.example          # Exemplo de arquivo de variáveis de ambiente
│   ├── package.json          # Dependências do backend
│   └── tsconfig.json         # Configuração do TypeScript
├── frontend/                 # Interface do Usuário (UI)
│   ├── src/
│   │   ├── assets/
│   │   │   ├── css/          # Estilos CSS
│   │   │   └── js/           # Scripts JavaScript compartilhados (e.g., JWT helper)
│   │   ├── pages/
│   │   │   ├── admin/        # Páginas do administrador
│   │   │   ├── auth/         # Páginas de login e registro
│   │   │   ├── central-controle/ # Páginas da central de controle
│   │   │   ├── motorista/    # Páginas do motorista
│   │   │   └── passageiro/   # Páginas do passageiro
│   │   └── index.html        # Página inicial
│   └── package.json          # (Opcional, se usar ferramentas de build no frontend)
└── .gitignore                # Arquivos e pastas a serem ignorados pelo Git
└── LICENSE                   # Arquivo de licença do projeto
└── README.md                 # Este arquivo

## Configuração e Execução

### Pré-requisitos

* Node.js (versão 18 ou superior recomendada)
* MongoDB (rodando localmente ou acesso a um Atlas DB)
* npm (gerenciador de pacotes do Node.js)

### Backend

1.  **Navegue até a pasta `backend`:**
    ```bash
    cd backend
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Crie um arquivo `.env`:**
    Crie um arquivo chamado `.env` na raiz da pasta `backend` (ao lado de `package.json` e `src`). Copie o conteúdo de `.env.example` para ele e preencha com suas configurações:
    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/magebus
    JWT_SECRET=seu_segredo_jwt_muito_seguro_e_longo
    JWT_EXPIRES_IN=1h
    ```
    Certifique-se de usar um `JWT_SECRET` longo e aleatório.
4.  **Inicie o servidor backend:**
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

### Frontend

1.  **Navegue até a pasta `frontend`:**
    ```bash
    cd frontend
    ```
2.  **(Opcional) Instale dependências se houver:**
    Se você adicionar um `package.json` e dependências específicas para o frontend (como frameworks ou ferramentas de build), execute:
    ```bash
    npm install
    ```
3.  **Abra o `index.html` com Live Server:**
    Use a extensão "Live Server" do VS Code para abrir o arquivo `frontend/src/index.html`. Isso garantirá que o frontend seja servido corretamente em uma porta separada (e.g., `http://127.0.0.1:5500`).

## Rotas da API (Backend)

As rotas da API estão disponíveis em `http://localhost:3000/api/v1/`.

### Autenticação (`/api/v1/auth`)

* `POST /register`: Registrar novo usuário.
    * **Body:** `{ "nome": "...", "email": "...", "senha": "...", "role": "passageiro" | "motorista" | "centralControle" | "admin" }`
* `POST /login`: Fazer login.
    * **Body:** `{ "email": "...", "senha": "..." }`
* `GET /me` (Protegida): Obter informações do usuário logado.
    * **Header:** `Authorization: Bearer <token_jwt>`

### Gerenciamento de Ônibus (`/api/v1/onibus`)

* `GET /` (Protegida): Listar todos os ônibus.
* `GET /:id` (Protegida): Obter detalhes de um ônibus específico.
* `POST /` (Protegida - `admin`): Adicionar novo ônibus.
    * **Body:** `{ "placa": "...", "linha": "...", "capacidade": ..., "status": "emOperacao" | "parado" | "emManutencao" | "indisponivel", "motorista": "ID_DO_MOTORISTA" (opcional) }`
* `PUT /:id` (Protegida - `admin`): Atualizar informações de um ônibus.
    * **Body:** `{ "placa": "...", "linha": "...", ... }`
* `DELETE /:id` (Protegida - `admin`): Excluir um ônibus.

## Licença

Este projeto está sob uma licença **privativa**. Todos os direitos reservados.
A reprodução, modificação, distribuição ou uso comercial deste software sem permissão explícita do(s) autor(es) é estritamente proibida.

## Contato

oDevFred - caio.frederico2001@outlook.com
