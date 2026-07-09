const swaggerUi = require('swagger-ui-express');

// 1. Criamos a lista base contendo o Localhost
const serversList = [
  {
    url: 'http://localhost:3000',
    description: 'Servidor Local',
  },
];

// 2. Se você colocar a variável API_SERVER_URL no seu .env, ela entra na lista automaticamente
if (process.env.API_SERVER_URL) {
  serversList.unshift({
    url: process.env.API_SERVER_URL,
    description: 'Servidor de Produção / Nuvem',
  });
}

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Blogging Escolar',
    version: '1.0.0',
    description: 'Documentação dos endpoints de posts e usuários para professores e alunos.',
  },
  
  servers: serversList,

  //// token
  security: [
    {
      access_token: [],
    },
  ],

  components: {
    schemas: {
      Post: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          id: { type: 'integer', description: 'ID autogerado do post', readOnly: true },
          title: { type: 'string', description: 'Título da postagem' },
          content: { type: 'string', description: 'Conteúdo completo do post' },
          userId: {
            type: 'integer',
            description: 'ID do autor (preenchido automaticamente pelo usuário logado, não precisa enviar)',
            readOnly: true,
          },
          autor: {
            type: 'object',
            readOnly: true,
            description: 'Dados do autor (retornado pela API, não precisa enviar)',
            properties: {
              id: { type: 'integer' },
              nome: { type: 'string' },
              email: { type: 'string', format: 'email' },
              role: { type: 'string' },
            },
          },
          createdAt: { type: 'string', format: 'date-time', readOnly: true },
          updatedAt: { type: 'string', format: 'date-time', readOnly: true },
        },
      },


      User: {
        type: 'object',
        required: ['nome', 'email'],
        properties: {
          id: { type: 'integer', description: 'ID autogerado do usuário' },
          nome: { type: 'string', description: 'Nome do usuário' },
          email: { type: 'string', format: 'email', description: 'E-mail do usuário' },
          senha: { type: 'string', format: 'password', description: 'Senha do usuário' },
          role: { type: 'string', description: 'Papel do usuário (aluno, docente, etc.)' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },

    ////// Bearer token (Authorization: Bearer <token>)
    securitySchemes: {
      access_token: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },

  

  paths: {
    '/posts': {
      get: {
        summary: 'Retorna a lista de posts ou realiza busca por termo',
        parameters: [
          {
            in: 'query',
            name: 'term',
            schema: { type: 'string' },
            description: 'Palavra-chave para buscar no título ou conteúdo',
          },
        ],
        responses: {
          200: {
            description: 'Lista de posts retornada com sucesso',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
              },
            },
          },
        },
      },

      post: {
        summary: 'Cria uma nova postagem (Apenas Docentes)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Post' },
            },
          },
        },
        responses: {
          201: {
            description: 'Post criado com sucesso',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Post' } },
            },
          },
        },
      },

    },
    '/posts/{id}': {
      get: {
        summary: 'Retorna o conteúdo completo de um post específico pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'Post encontrado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Post' } },
            },
          },
          404: { description: 'Postagem não encontrada' },
        },
      },
      put: {
        summary: 'Edita uma postagem existente pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Post' } },
          },
        },
        responses: {
          200: { description: 'Post atualizado com sucesso' },
          404: { description: 'Postagem não encontrada' },
        },
      },
      delete: {
        summary: 'Exclui uma postagem específica pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Postagem deletada com sucesso' },
          404: { description: 'Postagem não encontrada' },
        },
      },
    },
    '/posts/search': {
      get: {
        summary: 'Busca posts por palavra-chave',
        parameters: [
          {
            in: 'query',
            name: 'term',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {
          200: { description: 'OK' },
        },
      },
    },

    '/login': {
      post: {
        summary: 'Autentica um usuário e retorna o token de acesso',
        security: [],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'senha'],
                properties: {
                  email: { type: 'string', format: 'email', description: 'E-mail do usuário' },
                  senha: { type: 'string', format: 'password', description: 'Senha do usuário' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', description: 'Token JWT de acesso' },
                    usuario: {
                      type: 'object',
                      properties: {
                        id: { type: 'integer' },
                        nome: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        role: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: { description: 'Credenciais inválidas' },
        },
      },
    },

    '/users': {
      get: {
        summary: 'Retorna a lista de usuários',
        responses: {
          200: {
            description: 'Lista de usuários retornada com sucesso',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
              },
            },
          },
        },
      },
      post: {
        summary: 'Cria um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/User' },
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Retorna um usuário específico pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/User' } },
            },
          },
          404: { description: 'Usuário não encontrado' },
        },
      },
      put: {
        summary: 'Edita um usuário existente pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/User' } },
          },
        },
        responses: {
          200: { description: 'Usuário atualizado com sucesso' },
          404: { description: 'Usuário não encontrado' },
        },
      },
      delete: {
        summary: 'Exclui um usuário específico pelo ID',
        parameters: [
          { in: 'path', name: 'id', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          200: { description: 'Usuário deletado com sucesso' },
          404: { description: 'Usuário não encontrado' },
        },
      },
    },
  },
};

module.exports = swaggerDocument;