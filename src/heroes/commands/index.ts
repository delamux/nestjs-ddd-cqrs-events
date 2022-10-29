import { CreateHeroCommandHandler } from './create-hero/create-hero.command-handler';
import { UpdateHeroPowersHandler } from './update-powers/update-powers.command-handler';

export const HeroCommandHandlers = [
  CreateHeroCommandHandler,
  UpdateHeroPowersHandler,
];
