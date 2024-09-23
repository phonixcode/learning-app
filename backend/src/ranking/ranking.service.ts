import { Injectable } from '@nestjs/common';
import { ProgressService } from '../progress/progress.service';
import { SubjectService } from '../subjects/subjects.service';

@Injectable()
export class RankingService {
  constructor(
    private readonly progressService: ProgressService,
    private readonly subjectService: SubjectService,
  ) {}

  async rankLearnersBySubject(subjectId: number) {
    // Fetch all topics for the subject
    const topics = await this.subjectService.findTopicsBySubject(subjectId);
    const topicIds = topics.map(topic => topic.id);

    // Get all progress records for the subject's topics
    const progressRecords = await this.progressService.getProgressByTopicIds(topicIds);

    // Group progress records by user and calculate the completion rate for each learner
    const learnersWithCompletionRate = progressRecords.reduce((acc, progress) => {
      const userId = progress.user.id;
      const userProgress = acc[userId] || { user: progress.user, completedCount: 0, totalCount: topicIds.length };

      if (progress.completed) {
        userProgress.completedCount++;
      }

      acc[userId] = userProgress;
      return acc;
    }, {});

    // Convert the grouped data to an array and calculate completion rates
    const rankedLearners = Object.values(learnersWithCompletionRate).map((learner: any) => {
      const completionRate = learner.totalCount > 0 ? (learner.completedCount / learner.totalCount) * 100 : 0;
      return {
        user: learner.user,
        completionRate,
      };
    });

    // Sort learners by completion rate (highest first)
    rankedLearners.sort((a, b) => b.completionRate - a.completionRate);

    return rankedLearners;
  }
}
