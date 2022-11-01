import { Module } from '@nestjs/common';
import { MongodbModule } from './domain/infrastructure/database/mongodb/mongodb.module';
import { HeroModule } from './heroes/hero.module';

@Module({
  imports: [HeroModule, MongodbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
