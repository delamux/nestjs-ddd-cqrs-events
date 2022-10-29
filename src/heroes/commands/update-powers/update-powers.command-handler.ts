import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { HeroEntityRepository } from 'src/heroes/db/hero-entity.repository';
import { HeroPowersUpdatedEvent } from 'src/heroes/events/hero-powers-updated/hero-powers-updated.event';

import { UpdatePowersCommandBus } from './update-powers.command-bus';

@CommandHandler(UpdatePowersCommandBus)
export class UpdateHeroPowersHandler
  implements ICommandHandler<UpdatePowersCommandBus>
{
  constructor(
    private readonly heroEntityRepository: HeroEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ heroId, powers }: UpdatePowersCommandBus): Promise<void> {
    const hero = await this.eventPublisher.mergeObjectContext(
      await this.heroEntityRepository.findOneById(heroId),
    );

    hero.updatePowers(powers);
    await this.heroEntityRepository.findOneAndReplaceById(heroId, hero);
    hero.apply(new HeroPowersUpdatedEvent(hero.getId()));

    hero.commit();
  }
}
