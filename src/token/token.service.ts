import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ActivityRepository } from 'src/activity/activity.repository';
import { TokenRepository } from './token.repository';
import { logger } from 'src/_config/logger';

@Injectable()
export class TokenService {
  constructor(
    private activityRepository: ActivityRepository,
    private tokenRepository: TokenRepository,
  ) {}
  @Cron('*/15 * * * *') // runs every 15 minute as fallback mechanism
  async validatePrices() {
    // fetch tokens
    // fetch last record for each token
    // update price
  }

  async calculatePrice() {
    logger.info('updating prices: in progress...');
    const activities = await this.activityRepository.findRecentlyInserted();
    await Promise.all(
      activities.map(async (activity) => {
        await this.tokenRepository.updateOrInsertActivity(activity);
      }),
    );
    logger.info('updating prices: completed');
  }
}
