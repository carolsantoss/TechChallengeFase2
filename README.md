# Tech Challenge - Fase 2: Plataforma de Blogging Dinâmico

API RESTful desenvolvida em **Node.js** para gerenciamento de postagens de um blog educacional, permitindo que professores da rede pública publiquem e gerenciem conteúdos de forma simples e organizada.

O projeto foi desenvolvido como parte do **Tech Challenge - Fase 2**, aplicando conceitos de arquitetura em camadas, testes automatizados, documentação de APIs, containerização e integração contínua.

---

# 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Swagger UI
- Jest
- Docker
- Docker Compose
- GitHub Actions
- Kubernetes

---

# 📂 Estrutura do Projeto

```text
TechChallengeFase2/
│
├── .github/
│   └── workflows/
│       └── ci.yaml
│
├── coverage/
│
├── k8s/
│   └── deploy.yaml
│
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── swagger.js
│   │
│   ├── controllers/
│   │   └── postController.js
│   │
│   ├── models/
│   │   └── postModel.js
│   │
│   ├── repositories/
│   │   └── postRepository.js
│   │
│   ├── routes/
│   │   └── postRoutes.js
│   │
│   ├── services/
│   │   └── postService.js
│   │
│   └── app.js
│
├── tests/
│   └── post.test.js
│
├── .dockerignore
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── index.js
├── jest.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

# 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas:

- **Routes** → Define os endpoints da API.
- **Controllers** → Recebem as requisições HTTP.
- **Services** → Contêm as regras de negócio.
- **Repositories** → Realizam o acesso ao banco de dados.
- **Models** → Definem as entidades do Sequelize.
- **Config** → Configurações do banco de dados e documentação Swagger.

Essa organização facilita a manutenção, reutilização de código e escalabilidade da aplicação.

---

# 🛠️ Endpoints da API

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/posts` | Lista todas as postagens. |
| GET | `/posts?term=texto` | Busca postagens por título ou conteúdo. |
| GET | `/posts/:id` | Retorna uma postagem pelo ID. |
| POST | `/posts` | Cria uma nova postagem. |
| PUT | `/posts/:id` | Atualiza uma postagem existente. |
| DELETE | `/posts/:id` | Remove uma postagem. |
| GET | `/docs` | Documentação Swagger. |

---

# 🚀 Executando o projeto

## 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd TechChallengeFase2
```

---

## 2. Configure as variáveis de ambiente

Crie um arquivo `.env` utilizando o `.env.example` como base.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=blog
DB_USER=postgres
DB_PASSWORD=senha
PORT=3000
JWT_SECRET=a_chave_secreta_
```

---

## 3. Executar utilizando Docker

```bash
docker-compose up --build
```

Após iniciar a aplicação:

API

```
http://localhost:3000
```

Swagger

```
http://localhost:3000/docs
```

---

## 4. Executar localmente

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm start
```

Caso utilize o modo desenvolvimento:

```bash
npm run dev
```

---

# 🧪 Testes

Para executar os testes automatizados:

```bash
npm test
```

Para visualizar a cobertura de testes:

```bash
npm test -- --coverage
```

Os testes utilizam o **Jest** para validar os principais fluxos da API.

---

# 📖 Documentação

A documentação da API é gerada com **Swagger**.

Após iniciar a aplicação, acesse:

```
[http://localhost:3000/docs](https://techchallenger.duckdns.org/docs/)
```

Nela é possível visualizar todos os endpoints e realizar testes diretamente pelo navegador.

---

# 🐳 Docker

Para construir e iniciar os containers:

```bash
docker-compose up --build
```

Para parar os containers:

```bash
docker-compose down
```

---

# ☸️ Kubernetes

Os arquivos de implantação encontram-se na pasta:

```text
k8s/
```

O arquivo `deploy.yaml` pode ser utilizado para realizar o deploy da aplicação em um cluster Kubernetes.

---

# ⚙️ CI/CD

O projeto utiliza **GitHub Actions** para automação do processo de integração contínua.

O pipeline realiza automaticamente:

- Instalação das dependências;
- Execução dos testes;
- Geração da cobertura;
- Build da aplicação.

---

Projeto desenvolvido para o **Tech Challenge - Fase 2**.
