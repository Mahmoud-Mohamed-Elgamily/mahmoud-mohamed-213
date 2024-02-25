import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { fetchEvents } from 'src/_config/api';
import { ActivityRepository } from './activity.repository';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class ActivityService {
  constructor(
    private activityRepository: ActivityRepository,
    private tokenService: TokenService,
  ) {}
  @Cron('*/1 * * * *')
  async fetchEvents() {
    const events = await fetchEvents();
    const newOrderEvents = events.filter(
      (event) => (event.event.kind = 'new-order'),
    );
    await this.activityRepository.bulkInsert(newOrderEvents);
    await this.tokenService.calculatePrice(); // this can be updated to trigger event instead of directly calling for loose coupling
  }
}
