import { EventsGateway } from './events.gateway';
import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  components: [EventsGateway]
})
export class ApplicationModule {}
