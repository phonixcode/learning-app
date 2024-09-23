import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; 
import { Topic } from '../subjects/topics/topic.entity'; 

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number; // Rating score (e.g., 1-5)

  @Column({ nullable: true }) 
  comment: string; 

  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.ratings)
  topic: Topic;
}
