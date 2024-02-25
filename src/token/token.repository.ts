import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Token } from './entity/token.entity';
import { IRecentActivities } from 'src/activity/types/recent-activities';

@Injectable()
export class TokenRepository extends Repository<Token> {
  constructor(private entityManager: EntityManager) {
    super(Token, entityManager);
  }

  async updateOrInsertActivity(activity: IRecentActivities) {
    const [token] = await this.find({
      where: {
        contract_address: activity.contract_address,
        index: activity.token_index,
      },
    });

    if (!token) return await this.insertToken(activity);

    const expiredListing = this.expiredListing(activity);
    const expiredToken = this.expiredListing({ listing_to: token.listing_to });

    const current_price = this.calculatePrice(
      expiredListing,
      expiredToken,
      token,
      activity,
    );

    return await this.update(token.id, { current_price });
  }

  expiredListing(activity: { listing_to }) {
    return activity.listing_to < new Date();
  }

  private calculatePrice(
    expiredListing: boolean,
    expiredToken: boolean,
    token: Token,
    activity: IRecentActivities,
  ) {
    if (expiredListing && expiredToken) return null;
    if (!expiredListing && !expiredToken)
      return Math.min(token.current_price, activity.listing_price);
    if (expiredListing) return token.current_price;
    if (expiredToken) return activity.listing_price;
  }

  private async insertToken(activity: IRecentActivities): Promise<Token> {
    return (
      await this.insert({
        contract_address: activity.contract_address,
        current_price: this.expiredListing(activity)
          ? null
          : activity.listing_price,
        index: activity.token_index,
        listing_to: activity.listing_to,
      })
    ).raw;
  }
}
