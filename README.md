# Tech Challenge - Plataforma Nacional de Blogging Educacional

## Sobre o Projeto
Este projeto foi desenvolvido como parte do **Tech Challenge** do curso. O objetivo principal é resolver um problema real enfrentado por professores e professoras da rede pública de educação: a falta de uma plataforma centralizada, prática e tecnológica para postar aulas e transmitir conhecimento aos alunos.

Após o sucesso da validação do protótipo em low-code (OutSystems), esta aplicação representa a **refatoração e escalonamento do Back-end** para um panorama nacional. A API foi totalmente reconstruída utilizando **Node.js** e arquitetada para suportar alta escalabilidade, persistência robusta de dados e deploy automatizado.

---

## Tecnologias Utilizadas

*   **Ambiente de Execução:** Node.js (v20+)
*   **Framework Web:** Express
*   **Banco de Dados:** PostgreSQL
*   **Containerização:** Docker & Docker Compose
*   **Testes Unitários:** Jest e Supertest
*   **Integração Contínua (CI):** GitHub Actions

---

## Arquitetura do Sistema
A aplicação segue o padrão **MVC (Model-View-Controller)** adaptado para APIs REST, garantindo a separação de responsabilidades e facilitando a escrita de testes automatizados:

*   `📁 src/models`: Definição do esquema de dados dos posts.
*   `📁 src/controllers`: Lógica de controle, recebimento de requisições e respostas HTTP.
*   `📁 src/routes`: Mapeamento dos endpoints e rotas da API.
*   `📁 src/services`: Regras de negócio e lógica de busca (onde se concentram os testes).

---

## Como Executar o Projeto

Graças à containerização com Docker, você não precisa instalar o Node.js ou o Banco de Dados localmente. Basta ter o Docker instalado.

### Pré-requisitos
*   [Docker](https://www.docker.com/)
*   [Docker Compose](https://docs.docker.com/compose/)

### Passos para Execução
1. Clone o repositório:
```bash
   git clone https://github.com/carolsantoss/TechChallengeFase2.git
   cd TechChallengeFase2

### 🚀 Como Rodar o Projeto

# 1. Subir o projeto inteiro (API + Banco de Dados)
docker compose up -d

# 2. Ver se deu tudo certo (Logs do sistema)
docker compose logs -f

# 3. Atualizar o sistema após mudar o código
docker compose up --build -d

# 4. Parar e desligar tudo
docker compose down

---

### 🔗 Link de Acesso
* Documentação Swagger: http://localhost:3000/docs