import { Controller, Get, Param } from '@nestjs/common';
import { RankingService } from './ranking.service';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get(':subjectId')
  async getRanking(@Param('subjectId') subjectId: number) {
    return this.rankingService.rankLearnersBySubject(subjectId);
  }
}
