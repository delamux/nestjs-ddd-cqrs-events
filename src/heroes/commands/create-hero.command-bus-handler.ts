import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { HeroFactory } from '../model/hero.factory';
import { CreateHeroCommandBus } from './create-hero.command-bus';

@CommandHandler(CreateHeroCommandBus)
export class CreateHeroCommandBusHandler
  implements ICommandHandler<CreateHeroCommandBus>
{
  constructor(
    private readonly heroFactory: HeroFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createHeroRequest }: CreateHeroCommandBus): Promise<void> {
    const { name, age, powers } = createHeroRequest;
    const hero = await this.eventPublisher.mergeObjectContext(
      await this.heroFactory.create(name, age, powers),
    );

    hero.commit();
  }
}
