import { ObjectId } from 'mongodb';

export class HeroesDto {
  readonly _id: ObjectId;
  readonly name: string;
  readonly age: number;
  readonly powers: string[];
}
