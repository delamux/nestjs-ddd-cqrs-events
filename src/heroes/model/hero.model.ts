import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export class Hero extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly name: string,
    private readonly age: number,
    private powers: string[],
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

  updatePowers(powers: string[]): void {
    const powersLower = powers.map((power) => power.toLocaleLowerCase());

    if (powersLower.includes('blink eyes')) {
      throw new BadRequestException('blink eyes is not a power.');
    }

    this.powers = powers;
  }
}
