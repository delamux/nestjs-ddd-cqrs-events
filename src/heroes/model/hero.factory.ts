import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { EntityFactory } from 'src/domain/infrastructure/database/mongodb/entity.factory';
import { HeroEntityRepository } from '../db/hero-entity.repository';
import { HeroCreatedEvent } from '../events/hero-created/hero-created.event';
import { Hero } from '../model/Hero';

@Injectable()
export class HeroFactory implements EntityFactory<Hero> {
  constructor(private readonly heroEntityRepository: HeroEntityRepository) {}

  async create(name: string, age: number, powers: string[]): Promise<Hero> {
    const hero = new Hero(new ObjectId().toHexString(), name, age, powers);

    await this.heroEntityRepository.create(hero);

    hero.apply(new HeroCreatedEvent(hero.getId()));

    return hero;
  }
}
