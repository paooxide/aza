import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { json } from 'body-parser';

@Injectable()
export class RawRequestMiddleware implements NestMiddleware {
  public use(req: Request, res: Response<any>, next: () => any): any {
    json({
      verify: (req: any, res, buffer) => {
        if (Buffer.isBuffer(buffer)) {
          const rawBody = Buffer.from(buffer);
          req['parsedRawBody'] = rawBody;
        }
        return true;
      },
    })(req, res as any, next);
  }
}
