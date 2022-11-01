import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProducerService } from 'src/domain/microservices/kafka/producer.service';
import { HeroesDtoRepository } from '../../db/heroes-dto.repository';
import { HeroesDto } from '../../dto/heroes.dto';
import { HeroesQueryBus } from './heroes.query-bus';

@QueryHandler(HeroesQueryBus)
export class HeroesQueryHandler implements IQueryHandler<HeroesQueryBus> {
  constructor(
    private readonly heroesDtoRepository: HeroesDtoRepository,
    private readonly producerService: ProducerService,
  ) {}

  async execute(): Promise<HeroesDto[]> {
    await this.producerService.produce({
      topic: 'hero',
      messages: [
        {
          value: 'Hello from query bus',
        },
      ],
    });
    return this.heroesDtoRepository.findAll();
  }
}
