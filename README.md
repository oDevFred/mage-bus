# 🚌 Mage-Bus - Sistema de Gerenciamento de Frotas de Ônibus

Um sistema completo para gerenciamento de frotas de ônibus, incluindo módulos para administradores, central de controle e motoristas. O objetivo é otimizar a operação, o monitoramento em tempo real e a comunicação dentro de uma empresa de transporte.

---

## 🚀 Tecnologias Utilizadas

### Backend (API REST)
* **Node.js**: Ambiente de execução JavaScript.
* **Express.js**: Framework web para Node.js.
* **TypeScript**: Linguagem para tipagem estática.
* **Mongoose**: ODM (Object Data Modeling) para MongoDB.
* **MongoDB**: Banco de dados NoSQL.
* **JWT (JSON Web Tokens)**: Para autenticação.
* **Bcrypt**: Para hashing de senhas.
* **Dotenv**: Para gerenciamento de variáveis de ambiente.
* **CORS**: Para lidar com requisições de diferentes origens.

### Frontend (Interface do Usuário)
* **HTML5 / CSS3**: Estrutura e estilo.
* **JavaScript (Vanilla JS)**: Lógica do lado do cliente.
* **Bootstrap**: Framework para UI responsiva.
* **Leaflet.js**: Biblioteca para mapas interativos.
* **Bootstrap Icons**: Para iconografia.

---

## ✨ Funcionalidades

* **Autenticação e Autorização**: Sistema robusto de login com JWT e controle de acesso baseado em perfis (Admin, Central de Controle, Motorista).
* **Geolocalização em Tempo Real**: Rastreamento de ônibus com atualizações de localização enviadas pelos motoristas e visualizadas no painel da central de controle.
* **Painel do Administrador**:
    * Gerenciamento completo (CRUD) de ônibus.
    * Gerenciamento de usuários (criação de motoristas, administradores, etc.).
    * Atribuição de motoristas a ônibus específicos.
* **Painel da Central de Controle**:
    * Visualização em tempo real de toda a frota em um mapa interativo.
    * Monitoramento do status e localização de cada ônibus.
* **Painel do Motorista**:
    * Visualização do próprio ônibus atribuído.
    * Atualização do status do ônibus (ex: Em Operação, Parado).
    * Envio de coordenadas de geolocalização para o sistema.

---

## 📂 Estrutura do Projeto
```
mage-bus/
├── backend/                  # Servidor Node.js (API REST)
│   ├── src/
│   │   ├── controllers/      # Lógica de negócio das rotas (usuários, ônibus)
│   │   ├── middlewares/      # Funções intermediárias (autenticação, autorização)
│   │   ├── models/           # Schemas e modelos do Mongoose (Usuário, Ônibus)
│   │   ├── routes/           # Definição das rotas da API
│   │   ├── app.ts            # Ponto de entrada do backend
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
├── .gitignore                # Arquivos e pastas a serem ignorados pelo Git
└── README.md                 # Este arquivo
```
## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
* [MongoDB](https://www.mongodb.com/try/download/community) (instância local ou via MongoDB Atlas)

### Configuração do Backend

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/mage-bus.git](https://github.com/seu-usuario/mage-bus.git)
    cd mage-bus/backend
    ```
2.  **Crie o arquivo `.env`:**
    No diretório `backend/`, crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente, substituindo os valores pelos seus:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/magebus_db # ou sua URI do MongoDB Atlas
    JWT_SECRET=seuSegredoJWTSuperSeguroAqui # Use uma string longa e aleatória
    JWT_EXPIRE=1h
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
4.  **Inicie o servidor backend:**
    ```bash
    npm start
    ```
    O servidor estará rodando em `http://localhost:3000`.

### Configuração do Frontend

1.  **Navegue até o diretório do frontend:**
    ```bash
    cd ../frontend
    ```
2.  **Abra o `index.html` em seu navegador** ou use uma extensão de servidor local (ex: Live Server para VS Code) para servir a pasta `frontend/`.
    Se você estiver usando o Live Server, o frontend provavelmente estará em `http://127.0.0.1:5500` ou similar. Certifique-se de que o frontend está configurado para fazer requisições para `http://localhost:3000`.

---

## 🗺️ Roadmap (Próximos Passos)

* Implementar funcionalidades de geolocalização dos ônibus.
* Criar dashboards interativos para a Central de Controle.
* Desenvolver o módulo para passageiros.
* Adicionar validação de entrada de dados mais robusta.
* Implementar testes unitários e de integração.
* Melhorar a interface de usuário do frontend.

---

## 📄 Licença

Todos os direitos reservados.

Este software e todos os arquivos associados a ele são propriedade exclusiva de Caio Eduardo Ferreira Frederico.

É expressamente proibida a reprodução, modificação, distribuição, venda ou qualquer forma de uso comercial ou não-comercial deste software, no todo ou em parte, sem a permissão expressa e por escrito do(s) detentor(es) dos direitos autorais.

Para quaisquer perguntas sobre o licenciamento ou permissões, entre em contato com caio.frederico2001@outlook.com.

© 2025 Caio Eduardo Ferreira Frederico. Todos os direitos reservados.