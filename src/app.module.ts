import { Module } from '@nestjs/common';
import { MongodbModule } from './domain/infrastructure/database/mongodb/mongodb.module';
import { HeroModule } from './heroes/hero.module';
import { KafkaModule } from 'src/domain/microservices/kafka/kafka.module';

@Module({
  imports: [HeroModule, MongodbModule, KafkaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
