import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './subjects.entity';
import { Topic } from './topics/topic.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find(); 
  }

  async findOne(id: number): Promise<Subject> {
    return this.subjectRepository.findOne({
      where: { id },
      relations: ['topics'],
    });
  }

  async create(subject: Subject): Promise<Subject> {
    return this.subjectRepository.save(subject);
  }

  async update(id: number, subject: Subject): Promise<void> {
    await this.subjectRepository.update(id, subject);
  }

  async remove(id: number): Promise<void> {
    await this.subjectRepository.delete(id);
  }

  async findTopicsBySubject(subjectId: number): Promise<Topic[]> {
    return this.topicRepository.find({
      where: { subject: { id: subjectId } },
    });
  }
}
