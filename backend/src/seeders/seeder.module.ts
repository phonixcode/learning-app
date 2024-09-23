import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Topic } from '../subjects/topics/topic.entity';
import { Rating } from '../ratings/rating.entity';
import { SeederController } from './seeder.controller';
import { Subject } from 'src/subjects/subjects.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Subject, Topic, Rating]),
    ],
    providers: [SeederService],
    controllers: [SeederController],
    exports: [SeederService],
})
export class SeederModule { }
