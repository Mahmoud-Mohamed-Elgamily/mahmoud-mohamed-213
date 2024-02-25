import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivityRepository } from './activity.repository';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityRepository],
})
export class ActivityModule {}
