import { HeroCreatedEventHandler } from './hero-created/hero-created.even-handler';
import { HeroPowersUpdatedEventHandler } from './hero-powers-updated/hero-powers-updated.even-handler';

export const HeroEventHandlers = [
  HeroCreatedEventHandler,
  HeroPowersUpdatedEventHandler,
];
