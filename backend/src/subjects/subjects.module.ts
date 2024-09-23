import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectController } from './subjects.controller';
import { SubjectService } from './subjects.service';
import { Subject } from './subjects.entity';
import { TopicModule } from './topics/topic.module';
import { RankingModule } from '../ranking/ranking.module';
import { Topic } from './topics/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subject, Topic]), TopicModule, RankingModule],
  controllers: [SubjectController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
