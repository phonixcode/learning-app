import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './topic.entity';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicService.findOne(+id);
  }

  @Post()
  create(@Body() topic: Topic): Promise<Topic> {
    return this.topicService.create(topic);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() topic: Topic): Promise<void> {
    return this.topicService.update(+id, topic);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.topicService.remove(+id);
  }
}
