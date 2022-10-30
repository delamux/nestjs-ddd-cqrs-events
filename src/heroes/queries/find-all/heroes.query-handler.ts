import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HeroesDtoRepository } from '../../db/heroes-dto.repository';
import { HeroesDto } from '../../dto/heroes.dto';
import { HeroesQueryBus } from './heroes.query-bus';

@QueryHandler(HeroesQueryBus)
export class HeroesQueryHandler implements IQueryHandler<HeroesQueryBus> {
  constructor(private readonly heroesDtoRepository: HeroesDtoRepository) {}
  async execute(query: HeroesQueryBus): Promise<HeroesDto[]> {
    return this.heroesDtoRepository.findAll();
  }
}
