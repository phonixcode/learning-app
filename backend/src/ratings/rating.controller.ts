import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dtos/create-rating.dto';

@Controller('ratings')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Get()
  findAll(): Promise<Rating[]> {
    return this.ratingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rating> {
    return this.ratingService.findOne(+id);
  }

  @Post()
  create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
    return this.ratingService.create(createRatingDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRatingDto: CreateRatingDto): Promise<void> {
    return this.ratingService.update(+id, updateRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ratingService.remove(+id);
  }
}
