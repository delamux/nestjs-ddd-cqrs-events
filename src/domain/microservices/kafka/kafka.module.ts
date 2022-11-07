import { Module } from '@nestjs/common';
import { MongodbService } from 'src/domain/infrastructure/database/mongodb/mongodb.service';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';

@Module({
  imports: [MongodbService],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
