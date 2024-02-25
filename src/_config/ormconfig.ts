import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfigFactory = (
  config: ConfigService,
): DataSourceOptions => ({
  type: 'mysql',
  host: config.get('DB_HOST'),
  port: parseInt(config.get('DB_PORT') || '3306'),
  username: config.get('DB_USER'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_DATABASE'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
});
