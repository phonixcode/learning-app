import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';

@Controller('seed')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post()
  async seed() {
    await this.seederService.seed();
    return { message: 'Database seeded successfully!' };
  }
}
