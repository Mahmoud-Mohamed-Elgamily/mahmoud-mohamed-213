import { Injectable } from '@nestjs/common';
import { ActivityRepository } from 'src/activity/activity.repository';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    private activityRepository: ActivityRepository,
    private tokenRepository: TokenRepository,
  ) {}
}
