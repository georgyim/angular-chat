import { EventsGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from './cats/schemas/room.schema';
@Module({
  imports: [ MongooseModule.forRoot('mongodb://localhost:27017/nest'), CatsModule],
  
components: []
})
export class ApplicationModule {}
