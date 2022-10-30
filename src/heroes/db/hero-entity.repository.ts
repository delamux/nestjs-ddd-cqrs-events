import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseEntityRepository } from 'src/domain/infrastructure/database/mongodb/base-entity.repository';
import { Hero } from '../model/hero.model';
import { HeroSchema } from './hero.schema';
import { HeroSchemaFactory } from './hero.schema.factory';

@Injectable()
export class HeroEntityRepository extends BaseEntityRepository<
  HeroSchema,
  Hero
> {
  constructor(
    @InjectModel(HeroSchema.name)
    heroModel: Model<HeroSchema>,
    heroSchemaFactory: HeroSchemaFactory,
  ) {
    super(heroModel, heroSchemaFactory);
  }
}
