import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Subject } from '../subjects.entity';
import { Rating } from 'src/ratings/rating.entity';
import { Progress } from 'src/progress/progress.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @ManyToOne(() => Subject, (subject) => subject.topics)
  subject: Subject;

  @OneToMany(() => Rating, (rating) => rating.topic, {eager: true})
  ratings: Rating[];

  @OneToMany(() => Progress, (progress) => progress.topic)
  progress: Progress[];
}
