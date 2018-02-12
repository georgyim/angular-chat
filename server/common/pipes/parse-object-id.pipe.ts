import { HttpException } from '@nestjs/common';
import {
  PipeTransform,
  Pipe,
  ArgumentMetadata,
  HttpStatus,
} from '@nestjs/common';

@Pipe()
export class ParseObjectIdPipe implements PipeTransform<string> {
  async transform(value: string, metadata: ArgumentMetadata) {

    if (!value.match('^[a-fA-F0-9]{24}$')) {
        throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
