import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { HeroPowersUpdatedEvent } from './hero-powers-updated.event';

@EventsHandler(HeroPowersUpdatedEvent)
export class HeroPowersUpdatedEventHandler
  implements IEventHandler<HeroPowersUpdatedEvent>
{
  async handle({ heroId }: HeroPowersUpdatedEvent): Promise<void> {
    console.log('Hero powers updated with Id: ', heroId);
  }
}
