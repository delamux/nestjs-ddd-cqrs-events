import { CreateHeroRequest } from '../../dto/request/create-hero-request.dto';

export class CreateHeroCommandBus {
  constructor(public readonly createHeroRequest: CreateHeroRequest) {}
}
