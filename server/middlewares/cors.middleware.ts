import { Injectable, NestMiddleware, } from '@nestjs/common';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(): any {
    return (req, res, next) => {
      // list os domains
      res.header('Access-Control-Allow-Origin', '*');
      // list of methods (e.g GET,HEAD,PUT,PATCH,POST,DELETE)
      res.header('Access-Control-Allow-Headers', '*');
      res.header('Access-Control-Allow-Methods', '*');
      next();
    };
  }
}

