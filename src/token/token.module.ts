import { Module, forwardRef } from '@nestjs/common';
import { TokenService } from './token.service';
import { ActivityModule } from 'src/activity/activity.module';
import { TokenRepository } from './token.repository';

@Module({
  imports: [forwardRef(() => ActivityModule)],
  controllers: [],
  providers: [TokenService, TokenRepository],
  exports: [TokenService],
})
export class TokenModule {}
