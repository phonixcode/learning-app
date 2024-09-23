import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) {}

  findAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  findOne(id: number): Promise<Topic> {
    return this.topicRepository.findOneBy({ id });
  }

  create(topic: Topic): Promise<Topic> {
    return this.topicRepository.save(topic);
  }

  update(id: number, topic: Topic): Promise<void> {
    return this.topicRepository.update(id, topic).then(() => {});
  }

  remove(id: number): Promise<void> {
    return this.topicRepository.delete(id).then(() => {});
  }
}
