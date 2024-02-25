import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Activity } from './entity/activity.entity';
import { ConfigService } from '@nestjs/config';
import { IRecentActivities } from './types/recent-activities';

@Injectable()
export class ActivityRepository extends Repository<Activity> {
  constructor(
    private entityManager: EntityManager,
    private configService: ConfigService,
  ) {
    super(Activity, entityManager);
  }

  async bulkInsert(newOrderEvents: { order: any; event: any; kind: any }[]) {
    if (!newOrderEvents.length) {
      return;
    }

    const ActivityRecords = newOrderEvents.map((event) => {
      // there is no order.validTo column so I used validUntil instead
      // assuming listing_to is the sum of
      // event.order.validUntil and createdAt
      // since all event.order.validUntil values are in 1970
      const created_at = new Date(event.event.createdAt);
      const listing_to = new Date(
        created_at.setMilliseconds(
          created_at.getMilliseconds() + event.order.validUntil,
        ),
      );

      return {
        contract_address: event.order.contract,
        token_index: event.order.criteria.data.token.tokenId,
        listing_price: event.order.price.amount.native,
        maker: event.order.maker,
        listing_from: new Date(event.order.validFrom),
        listing_to,
        event_timestamp: event.event.createdAt,
      } as Activity;
    });
    await this.createQueryBuilder().insert().values(ActivityRecords).execute();
  }

  async findRecentlyInserted(): Promise<IRecentActivities[]> {
    return await this.find({
      order: { id: 'DESC' },
      take: this.configService.get('RECORDS_LIMIT') || 1000,
      select: [
        'contract_address',
        'token_index',
        'listing_to',
        'listing_price',
      ],
    });
  }
}
