import { Request } from 'express';

interface DefaultAttribs {
  id: string;
  createdAt: string;
  updatedAt: string;
}

type ExcludedAttribs = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

export interface List extends DefaultAttribs {
  name: string;
  items: Item[];
}

export interface Item extends DefaultAttribs {
  lists: List[];
  description: string;
  isCompleted: boolean;
}

export type AppError = Error & {
  code: number;
  name?: string;
  message: string;
  validations?: object | null;
};

export type CreateErr = (
  message: string,
  code?: number,
  validations?: object | null,
) => Error;

interface AuthenticatedRequest extends Request {
  destination?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
  };
}
