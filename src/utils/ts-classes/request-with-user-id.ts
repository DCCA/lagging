import { Request } from 'express';

interface RequestUserId extends Request {
  userId: string | object;
}

export default RequestUserId;
