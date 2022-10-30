import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroesDto } from '../dto/heroes.dto';
import { HeroSchema } from './hero.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class HeroesDtoRepository {
  constructor(
    @InjectModel(HeroSchema.name)
    private readonly heroesModel: Model<HeroSchema>,
  ) {}

  async findAll(): Promise<HeroesDto[]> {
    return this.heroesModel.find({}, {}, { lean: true });
  }

  async findHero(heroId: string): Promise<HeroesDto> {
    return this.heroesModel.findById(new ObjectId(heroId), {}, { lean: true });
  }
}
