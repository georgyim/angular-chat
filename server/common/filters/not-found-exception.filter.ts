import * as path from 'path';
import { ExceptionFilter, Catch, NotFoundException, HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, response) {
    // response.sendFile(path.join(__dirname, '../../../../dist/index.html'));
  }
}
