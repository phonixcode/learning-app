import { Controller, Post, Get, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post(':userId/:topicId')
  async trackProgress(
    @Param('userId') userId: string,
    @Param('topicId') topicId: string,
    @Body('completed') completed: boolean,
  ) {
    try {
      const progress = await this.progressService.trackProgress(+userId, +topicId, completed);
      return {
        message: 'Progress tracked successfully',
        progress,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to track progress',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':userId/:topicId/update')
  async updateProgress(
    @Param('userId') userId: string,
    @Param('topicId') topicId: string,
    @Body('completed') completed: boolean,
  ) {
    try {
      const progress = await this.progressService.updateProgress(+userId, +topicId, completed);
      return {
        message: 'Progress updated successfully',
        progress,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to update progress',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':userId/:topicId')
  async getProgress(
    @Param('userId') userId: string,
    @Param('topicId') topicId: string,
  ) {
    try {
      const progress = await this.progressService.getProgress(+userId, +topicId);
      return {
        message: 'Progress retrieved successfully',
        progress,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to retrieve progress',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
