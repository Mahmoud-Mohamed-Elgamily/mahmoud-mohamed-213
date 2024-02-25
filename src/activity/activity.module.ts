import { Module, forwardRef } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ActivityRepository } from './activity.repository';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [ScheduleModule.forRoot(), forwardRef(() => TokenModule)],
  controllers: [],
  providers: [ActivityService, ActivityRepository],
  exports: [ActivityRepository],
})
export class ActivityModule {}
