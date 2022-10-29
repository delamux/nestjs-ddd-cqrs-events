import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from 'src/domain/infrastructure/database/mongodb/identifiable-entity.schema';

@Schema({ versionKey: false, collection: 'heroes' })
export class HeroSchema extends IdentifiableEntitySchema {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  powers: string[];
}
