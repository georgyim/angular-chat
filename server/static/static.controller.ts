import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

export const FOLDER_DIST = join(process.cwd(), 'dist');
export const FOLDER_CLIENT = 'client';
export const FOLDER_SERVER = 'server';


@Controller()
export class StaticController {

  @Get('*')
  serveStatic(@Res() res) {

    return res.sendFile(join(FOLDER_DIST, FOLDER_CLIENT, 'index.html'));
  }
}
