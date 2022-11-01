import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { KafkaModule } from 'src/domain/microservices/kafka/kafka.module';

import { HeroCommandHandlers } from './commands';
import { HeroConsumer } from './consumers/hero.consumer';
import { HeroEntityRepository } from './db/hero-entity.repository';
import { HeroSchema } from './db/hero.schema';
import { HeroSchemaFactory } from './db/hero.schema.factory';
import { HeroesDtoRepository } from './db/heroes-dto.repository';
import { HeroEventHandlers } from './events';
import { HeroesController } from './heroes.controller';
import { HeroFactory } from './model/hero.factory';
import { HeroQueryHandlers } from './queries';

@Module({
  imports: [
    KafkaModule,
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: HeroSchema.name,
        schema: SchemaFactory.createForClass(HeroSchema),
      },
    ]),
  ],
  controllers: [HeroesController],
  providers: [
    HeroEntityRepository,
    HeroesDtoRepository,
    HeroSchemaFactory,
    HeroFactory,
    ...HeroCommandHandlers,
    ...HeroEventHandlers,
    ...HeroQueryHandlers,
    HeroConsumer,
  ],
})
export class HeroModule {}
