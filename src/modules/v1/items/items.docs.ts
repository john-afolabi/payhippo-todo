import { boolean, booleanFalse, string } from '../../../swaggerTypes';

export default {
  '/v1/items': {
    post: {
      tags: ['Items'],
      summary: 'Create a new Item in List',
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              description: string,
              isCompleted: boolean,
            },
          },
        },
        {
          in: 'query',
          name: 'listId',
          required: true,
          schema: string,
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
    get: {
      tags: ['Items'],
      summary: 'Retrieve all items in list',
      parameters: [
        {
          in: 'query',
          name: 'listId',
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
                type: 'array',
                items: {
                  $ref: '#/definitions/Item',
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
  '/v1/items/{id}': {
    get: {
      tags: ['Items'],
      summary: 'Retrieve an item',
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
    put: {
      tags: ['Items'],
      summary: 'Update an Item',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: string,
        },
        {
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            type: 'object',
            properties: {
              description: string,
              isCompleted: boolean,
            },
          },
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
    delete: {
      tags: ['Items'],
      summary: 'Delete an item',
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
  '/v1/items/{id}/copy': {
    get: {
      tags: ['Items'],
      summary: 'Duplicate an Item',
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
  '/v1/items/{id}/lists': {
    get: {
      tags: ['Items'],
      summary: 'Retrieve item with lists',
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
                type: 'array',
                items: { $ref: '#/definitions/Item' },
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
