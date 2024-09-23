import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateRatingDto {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  userId: number; 

  @IsNotEmpty()
  topicId: number; 
}
