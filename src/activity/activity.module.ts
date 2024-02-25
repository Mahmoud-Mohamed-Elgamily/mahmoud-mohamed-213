import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivityRepository } from './activity.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityRepository],
})
export class ActivityModule {}
