import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { Topic } from '../subjects/topics/topic.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.progress)
  topic: Topic;

  @Column({ default: false })
  completed: boolean;
}
