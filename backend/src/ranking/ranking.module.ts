import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { ProgressModule } from '../progress/progress.module';
import { SubjectService } from '../subjects/subjects.service';
import { TopicService } from 'src/subjects/topics/topic.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'rxjs';
import { Topic } from 'src/subjects/topics/topic.entity';
import { RankingController } from './ranking.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Subject, Topic]),ProgressModule],
    providers: [RankingService, SubjectService, TopicService],
    controllers: [RankingController],
    exports: [RankingService],
})
export class RankingModule { }
