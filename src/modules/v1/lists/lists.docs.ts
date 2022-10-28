import { boolean, booleanFalse, string } from '../../../swaggerTypes';

export default {
  '/v1/lists': {
    post: {
      tags: ['Lists'],
      summary: 'Create a new list',
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              name: string,
            },
          },
        },
      ],
      responses: {
        201: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                $ref: '#/definitions/List',
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    get: {
      tags: ['Lists'],
      summary: 'Retrieve all lists',
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                type: 'array',
                items: {
                  $ref: '#/definitions/List',
                },
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/v1/lists/{id}': {
    get: {
      tags: ['Lists'],
      summary: 'Get a single list',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: string,
        },
      ],
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                $ref: '#/definitions/List',
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    put: {
      tags: ['Lists'],
      summary: 'Update a List',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: string,
        },
      ],
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                $ref: '#/definitions/List',
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    delete: {
      tags: ['Lists'],
      summary: 'Delete a list',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: string,
        },
      ],
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: boolean,
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
  '/v1/lists/{id}/items': {
    get: {
      tags: ['Lists'],
      summary: 'Get List with items',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: string,
        },
      ],
      responses: {
        200: {
          description: 'Successful',
          schema: {
            type: 'object',
            properties: {
              status: boolean,
              message: string,
              data: {
                $ref: '#/definitions/Item',
              },
            },
          },
        },
        400: {
          description: 'Failed',
          schema: {
            type: 'object',
            properties: {
              status: booleanFalse,
              message: string,
              data: null,
            },
          },
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
  },
};
