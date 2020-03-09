import { HttpException, Injectable } from '@nestjs/common';
import {
  PipeTransform,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {

    if (!value.match('^[a-fA-F0-9]{24}$')) {
        throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
