import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { SubjectService } from './subjects.service';
import { Subject } from './subjects.entity';
import { RankingService } from '../ranking/ranking.service';

@Controller('subjects')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly rankingService: RankingService,
  ) {}

  @Get()
  findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectService.findOne(+id);
  }

  @Post()
  create(@Body() subject: Subject): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() subject: Subject): Promise<void> {
    return this.subjectService.update(+id, subject);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.subjectService.remove(+id);
  }

  @Get(':id/rankings')
  getLearnerRankings(@Param('id') subjectId: string) {
    return this.rankingService.rankLearnersBySubject(+subjectId);
  }
}
