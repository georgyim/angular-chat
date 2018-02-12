import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from '../cats/schemas/room.schema';
import { EventsGateway } from '../events.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Room', schema: RoomSchema }])],
  controllers: [CatsController],
  components: [CatsService, EventsGateway],
})

export class CatsModule {}
