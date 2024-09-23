import { Injectable } from '@nestjs/common';
import { Progress } from './progress.entity';
import { Topic } from '../subjects/topics/topic.entity';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { In } from 'typeorm';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) { }

  async trackProgress(userId: number, topicId: number, completed: boolean): Promise<Progress> {
    const existingProgress = await this.progressRepository.findOne({
      where: {
        user: { id: userId },
        topic: { id: topicId },
      },
    });

    if (existingProgress) {
      throw new Error('Progress for this topic already exists for the user');
    }

    const progress = this.progressRepository.create({
      user: { id: userId },
      topic: { id: topicId },
      completed,
    });

    return this.progressRepository.save(progress);
  }

  async updateProgress(userId: number, topicId: number, completed: boolean): Promise<Progress> {
    const progress = await this.progressRepository.findOne({
      where: { user: { id: userId }, topic: { id: topicId } },
    });

    if (!progress) {
      throw new Error('Progress record not found');
    }

    progress.completed = completed;
    return this.progressRepository.save(progress);
  }

  async getProgress(userId: number, topicId: number): Promise<Progress[]> {
    return this.progressRepository.find({
      where: { user: { id: userId }, topic: { id: topicId } },
      relations: ['topic'],
    });
  }

  async getProgressBySubject(subjectId: number): Promise<Progress[]> {
    return this.progressRepository.find({
      where: {
        topic: {
          subject: { id: subjectId },
        },
      },
      relations: ['user', 'topic', 'topic.subject'],
    });
  }
  async getProgressByTopicIds(topicIds: number[]) {
    return this.progressRepository.find({
      where: {
        topic: {
          id: In(topicIds),
        },
      },
      relations: ['user'],
    });
  }

}
