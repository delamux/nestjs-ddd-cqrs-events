import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HeroesDtoRepository } from '../../db/heroes-dto.repository';
import { HeroesDto } from '../../dto/heroes.dto';
import { HeroQueryBus } from './hero.query-bus';

@QueryHandler(HeroQueryBus)
export class HeroesQueryHandler implements IQueryHandler<HeroQueryBus> {
  constructor(private readonly heroesDtoRepository: HeroesDtoRepository) {}
  async execute(query: HeroQueryBus): Promise<HeroesDto[]> {
    return this.heroesDtoRepository.findAll();
  }
}
