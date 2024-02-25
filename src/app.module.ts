import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigFactory } from './_config/ormconfig';
import { ActivityModule } from './activity/activity.module';
import { TokenModule } from './token/token.module';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { ErrorFilter } from './error.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        new winston.transports.Console({
          silent: false,
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
        }),
      ],
    }),
    ActivityModule,
    TokenModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: ErrorFilter }],
})
export class AppModule {}
