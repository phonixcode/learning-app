import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Subject } from '../subjects/subjects.entity';
import { Topic } from '../subjects/topics/topic.entity';
import { Rating } from '../ratings/rating.entity';
import { faker } from '@faker-js/faker';
import { Role } from '../users/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async seedUsers(count: number) {
    // Seed one admin user
    const admin = this.userRepository.create({
      email: 'admin@learner.app',
      username: 'admin',
      name: 'Admin User',
      password: 'password',
      role: Role.Admin,
    });
    await admin.hashPassword();
    await this.userRepository.save(admin);

    // Seed other users
    for (let i = 0; i < count; i++) {
      const user = this.userRepository.create({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        name: faker.person.fullName(),
        password: 'password',
        role: i % 2 === 0 ? Role.Learner : Role.Teacher,
      });
      await user.hashPassword();
      await this.userRepository.save(user);
    }
  }

  async seedSubjects() {
    const subjectsData = [
      { title: 'Mathematics', description: 'Study of numbers, shapes, and patterns.' },
      { title: 'English', description: 'Study of the English language and literature.' },
      { title: 'Computer Science', description: 'Study of computers and computational systems.' },
      { title: 'Physics', description: 'Study of matter, energy, and the fundamental forces of nature.' },
      { title: 'Chemistry', description: 'Study of the properties, composition, and behavior of matter.' },
    ];

    for (const subject of subjectsData) {
      const createdSubject = this.subjectRepository.create(subject);
      await this.subjectRepository.save(createdSubject);
    }
  }

  async seedTopics() {
    const subjects = await this.subjectRepository.find();
    
    const topicsData = {
      'Mathematics': [
        'Introduction to Algebra',
        'Calculus Basics',
        'Statistics and Probability',
      ],
      'English': [
        'Introduction to Literature',
        'Grammar and Composition',
        'Creative Writing',
      ],
      'Computer Science': [
        'Introduction to Computer Science',
        'Data Structures and Algorithms',
        'Web Development Basics',
      ],
      'Physics': [
        'Introduction to Mechanics',
        'Thermodynamics Basics',
        'Electromagnetism',
      ],
      'Chemistry': [
        'Introduction to Organic Chemistry',
        'Chemical Reactions',
        'Periodic Table of Elements',
      ],
    };

    const videoUrls = [
      'https://youtu.be/1SZle1skb84?si=Q7x6GKLkElZjmy76',
      'https://youtu.be/XL5gZYqHO3M?si=NNADG3t4ZyJEQ8K7',
      'https://youtu.be/iwSOeRcX9NI?si=jUrf5ouITy01A3Om',
      'https://youtu.be/Ddt3Vn_k-eQ?si=u9-VCm3uYhJuWE7-',
      'https://youtu.be/TcOEt6TdoYQ?si=jAtC5puz4NDL6UYc'
    ];
  
    for (const subject of subjects) {
      const topics = topicsData[subject.title];
      if (topics) {
        for (const topicTitle of topics) {
          const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];
          const topic = this.topicRepository.create({
            title: topicTitle,
            videoUrl: randomVideoUrl,
            description: `Learn about ${topicTitle}.`,
            subject, 
          });
          await this.topicRepository.save(topic);
        }
      }
    }
  }

  async seedRatings(count: number) {
    const users = await this.userRepository.find({ where: { role: Role.Learner } });
    const topics = await this.topicRepository.find();
  
    for (const user of users) {
      for (const topic of topics) {
        const rating = this.ratingRepository.create({
          user,
          topic,
          score: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentence(), 
        });
        await this.ratingRepository.save(rating);
      }
    }
  }

  async seed() {
    await this.seedUsers(9);
    await this.seedSubjects();
    await this.seedTopics();
    await this.seedRatings(30);
  }
}
