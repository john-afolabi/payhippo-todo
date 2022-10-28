import { config } from '../config';

import items from './modules/v1/items/items.docs';
import lists from './modules/v1/lists/lists.docs';

const doc = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Payhippo TODO List service API',
    description: 'An Application to manage todo lists',
  },
  host: config.url || `localhost:${config.port}`,
  basePath: '/',
  tags: [
    // Add tags here
  ],
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    // Add docs here
    ...lists,
    ...items,
  },
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      description: `Add token for authorization using the format Bearer (token)e.g.
        'Bearer eetelteouou1223424nkdnkdgndkg'`,
      name: 'Authorization',
    },
  },
  definitions: {
    List: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        items: {
          type: 'array',
          items: {
            $ref: '#/definitions/Item',
          },
        },
      },
      required: ['createdAt', 'id', 'name', 'updatedAt'],
      additionalProperties: false,
    },
    Item: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        lists: {
          type: 'array',
          items: {
            $ref: '#/definitions/List',
          },
        },
        description: {
          type: 'string',
        },
        isCompleted: {
          type: 'boolean',
        },
      },
      required: ['createdAt', 'description', 'id', 'isCompleted', 'updatedAt'],
      additionalProperties: false,
    },
  },
};

export default doc;
