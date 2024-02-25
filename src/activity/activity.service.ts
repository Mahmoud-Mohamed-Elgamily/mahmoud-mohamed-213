import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { fetchEvents } from 'src/_config/api';
import { ActivityRepository } from './activity.repository';

@Injectable()
export class ActivityService {
  constructor(private activityRepository: ActivityRepository) {}
  @Cron('*/1 * * * *')
  async fetchEvents() {
    const events = await fetchEvents();
    const newOrderEvents = events.filter(
      (event) => (event.event.kind = 'new-order'),
    );
    await this.activityRepository.bulkInsert(newOrderEvents);
  }
}
