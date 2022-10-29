import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntitySchemaFactory } from '../../domain/infrastructure/database/mongodb/entity-schema.factory';
import { Hero } from '../model/Hero';
import { HeroSchema } from './hero.schema';

@Injectable()
export class HeroSchemaFactory
  implements EntitySchemaFactory<HeroSchema, Hero>
{
  create(hero: Hero): HeroSchema {
    return {
      _id: new ObjectId(hero.getId()),
      name: hero.getName(),
      age: hero.getAge(),
      powers: hero.getPowers(),
    };
  }

  createFromSchema(heroSchema: HeroSchema): Hero {
    return new Hero(
      heroSchema._id.toHexString(),
      heroSchema.name,
      heroSchema.age,
      heroSchema.powers,
    );
  }
}
