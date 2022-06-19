import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { json } from 'body-parser';

@Injectable()
export class JsonRequestMiddleware implements NestMiddleware {
  public use(req: Request, res: Response<any>, next: () => any): any {
    json()(req, res as any, next);
  }
}
