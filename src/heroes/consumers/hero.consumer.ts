import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/domain/microservices/kafka/consumer.service';

@Injectable()
export class HeroConsumer implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['hero'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          try {
            console.log({
              value: message.value.toString(),
              topic: topic.toString(),
              partition: partition.toString(),
            });
          } catch (error) {
            throw new Error('💣 Hero consumer error!');
          }
        },
      },
    );
  }
}
