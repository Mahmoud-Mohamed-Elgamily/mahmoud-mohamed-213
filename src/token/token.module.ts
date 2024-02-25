import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { ActivityModule } from 'src/activity/activity.module';
import { TokenRepository } from './token.repository';

@Module({
  imports: [ActivityModule],
  controllers: [],
  providers: [TokenService, TokenRepository],
})
export class TokenModule {}
