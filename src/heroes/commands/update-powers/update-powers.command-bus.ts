import { UpdateHeroPowersRequest } from 'src/heroes/dto/request/update-hero-powers-request.dto';

export class UpdatePowersCommandBus {
  constructor(
    public readonly heroId: string,
    public readonly powers: string[],
  ) {}
}
