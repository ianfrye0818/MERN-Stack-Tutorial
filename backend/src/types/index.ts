//library imports
import { Request } from 'express';
export interface CustomRequest extends Request {
  user: {
    id: string;
    isAdmin: boolean;
  };
}
