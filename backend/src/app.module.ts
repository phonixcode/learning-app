import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RolesGuard } from './guards/roles.guard';
import { SubjectModule } from './subjects/subjects.module';
import { RatingModule } from './ratings/rating.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { SeederModule } from './seeders/seeder.module';
import { ProgressModule } from './progress/progress.module';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    AuthModule,
    UserModule,
    SubjectModule,
    // RatingModule,
    ProgressModule,
    RankingModule,
    SeederModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/auth/login')
      .exclude('/auth/register')
      .exclude('/seed');
      // .forRoutes('*');
  }
}
