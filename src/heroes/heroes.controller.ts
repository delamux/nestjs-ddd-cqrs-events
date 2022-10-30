import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateHeroCommandBus } from './commands/create-hero/create-hero.command-bus';
import { UpdatePowersCommandBus } from './commands/update-powers/update-powers.command-bus';
import { HeroesDto } from './dto/heroes.dto';
import { CreateHeroRequest } from './dto/request/create-hero-request.dto';
import { UpdateHeroPowersRequest } from './dto/request/update-hero-powers-request.dto';
import { HeroesQueryBus } from './queries/find-all/heroes.query-bus';
import { HeroQueryBus } from './queries/get-hero/hero.query-bus';

@Controller('heroes')
export class HeroesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getHero(@Param('id') heroId: string): Promise<HeroesDto> {
    return this.queryBus.execute<HeroQueryBus, HeroesDto>(
      new HeroQueryBus(heroId),
    );
  }

  @Get()
  async getHeroes(): Promise<HeroesDto[]> {
    return this.queryBus.execute<HeroesQueryBus, HeroesDto[]>(
      new HeroesQueryBus(),
    );
  }

  @Post()
  async createHero(
    @Body() createHeroRequest: CreateHeroRequest,
  ): Promise<void> {
    await this.commandBus.execute<CreateHeroCommandBus, void>(
      new CreateHeroCommandBus(createHeroRequest),
    );
  }

  @Patch(':id')
  async updateHeroPowers(
    @Param('id') heroId: string,
    @Body() updateHeroPowersRequest: UpdateHeroPowersRequest,
  ): Promise<void> {
    await this.commandBus.execute<UpdatePowersCommandBus, void>(
      new UpdatePowersCommandBus(heroId, updateHeroPowersRequest.powers),
    );
  }
}
