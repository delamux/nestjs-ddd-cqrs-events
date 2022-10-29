import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

import { HeroCommandHandlers } from './commands';
import { HeroEntityRepository } from './db/hero-entity.repository';
import { HeroSchema } from './db/hero.schema';
import { HeroSchemaFactory } from './db/hero.schema.factory';
import { HeroEventHandlers } from './events';
import { HeroesController } from './heroes.controller';
import { HeroFactory } from './model/hero.factory';

@Module({
  imports: [
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
    HeroSchemaFactory,
    HeroFactory,
    ...HeroCommandHandlers,
    ...HeroEventHandlers,
  ],
})
export class HeroModule {}
