import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Topic } from './topics/topic.entity';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Topic, (topic) => topic.subject, { eager: true })
  topics: Topic[];
}
