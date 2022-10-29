import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateHeroCommandBus } from './commands/create-hero.command-bus';
import { CreateHeroRequest } from './dto/request/create-hero-request.dto';
import { UpdateHeroPowersRequest } from './dto/request/update-hero-powers-request.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(':id')
  async getHero(@Param('id') heroId: string): Promise<void> {}

  @Get()
  async getHeroes(): Promise<void> {}

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
  ): Promise<void> {}
}
