import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Kafka,
  Consumer,
  ConsumerSubscribeTopics,
  ConsumerRunConfig,
} from 'kafkajs';
import { ConfigEnv } from 'src/config/environment';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  private readonly kafka = new Kafka({
    brokers: [this.configService.get(ConfigEnv.KAFKA_URI)],
  });

  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-hero-app' });

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);

    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
