import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongodbModule } from './domain/infrastructure/database/mongodb/mongodb.module';
import { HeroModule } from './heroes/hero.module';

@Module({
  imports: [ConfigModule.forRoot(), HeroModule, MongodbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
