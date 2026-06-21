const swaggerUi = require('swagger-ui-express');

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'API de Blogging Escolar',
    version: '1.0.0',
    description: 'Documentação dos endpoints de posts para professores e alunos.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local',
    },
  ],
  components: {
    schemas: {
      Post: {
        type: 'object',
        required: ['title', 'content', 'author'],
        properties: {
          id: { type: 'integer', description: 'ID autogerado do post' },
          title: { type: 'string', description: 'Título da postagem' },
          content: { type: 'string', description: 'Conteúdo completo do post' },
          author: { type: 'string', description: 'Nome do docente/autor' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
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
  },
};

module.exports = swaggerDocument;