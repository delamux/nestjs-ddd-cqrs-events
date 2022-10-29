import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HeroCreatedEvent } from './hero-created.event';

@EventsHandler(HeroCreatedEvent)
export class HeroCreatedEventHandler
  implements IEventHandler<HeroCreatedEvent>
{
  async handle({ heroId }: HeroCreatedEvent): Promise<void> {
    console.log('Hero created with Id: ', heroId);
  }
}
