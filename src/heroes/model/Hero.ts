import { AggregateRoot } from '@nestjs/cqrs';

export class Hero extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private readonly powers: string[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getPowers(): string[] {
    return [...this.powers];
  }
}
