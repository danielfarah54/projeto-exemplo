import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorization: string = req.headers?.['authorization'];
    await this.handleLocalStorage(authorization);

    next();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async handleLocalStorage(_authorization?: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
