import { Logger } from '@nestjs/common';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaMessage,
} from 'kafkajs';
import * as retry from 'async-retry';

import { sleep } from 'src/domain/shared/utils/sleep';
import { IConsumer } from './consumer.interface';
import { MongodbService } from 'src/domain/infrastructure/database/mongodb/mongodb.service';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(
    private readonly topics: ConsumerSubscribeTopics,
    private readonly mongodbService: MongodbService,
    config: ConsumerConfig,
    broker: string,
  ) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topics.topics}-${config.groupId}`);
  }

  async consume(onMessage: (message: KafkaMessage) => Promise<void>) {
    await this.consumer.subscribe(this.topics);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(
                `Error consuming message, executing retry ${attempt}/3...`,
                error,
              ),
          });
        } catch (err) {
          this.logger.error(
            'Error consuming message. Adding to dead letter queue...',
            err,
          );
          await this.addMessageToDlq(message);
        }
      },
    });
  }

  private async addMessageToDlq(message: KafkaMessage) {
    await this.mongodbService
      .getDbHandle()
      .collection('dlq')
      .insertOne({ value: message.value, topics: this.topics.topics });
  }

  async connect() {
    try {
      await this.consumer.connect();
    } catch (error) {
      this.logger.error('Failed to connect to Kafka', error);
      await sleep();
      await this.connect();
    }
  }

  async disconnect() {
    await this.consumer.disconnect();
  }
}
