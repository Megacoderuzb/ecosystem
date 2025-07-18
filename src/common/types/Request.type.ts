import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user: {
    id: number;
    role: string;
  };
}
