import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './rating.entity';
import { CreateRatingDto } from './dtos/create-rating.dto';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
  ) {}

  findAll(): Promise<Rating[]> {
    return this.ratingRepository.find();
  }

  findOne(id: number): Promise<Rating> {
    return this.ratingRepository.findOneBy({ id });
  }

  create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingRepository.create(createRatingDto);
    return this.ratingRepository.save(rating);
  }

  update(id: number, updateRatingDto: CreateRatingDto): Promise<void> {
    return this.ratingRepository.update(id, updateRatingDto).then(() => {});
  }

  remove(id: number): Promise<void> {
    return this.ratingRepository.delete(id).then(() => {});
  }
}
