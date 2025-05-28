import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import * as entities from '../../entities';

export class DatabaseConnection extends DataSource {}

export const databaseProviders = [
  {
    provide: DatabaseConnection,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      return SourceConnection.getInstance(configService).getDataSource();
    },
  },
];

export class SourceConnection {
  private static instance: SourceConnection;
  private dataSource: DataSource;

  private constructor(private readonly configService: ConfigService) {}

  async getDataSource(): Promise<DataSource> {
    if (!this.dataSource || !this.dataSource?.isInitialized) {
      this.dataSource = await new DataSource(this.getDataSourceOptions()).initialize();
    }

    return this.dataSource;
  }

  private getDataSourceOptions(): DataSourceOptions {
    return {
      type: 'mysql',
      host: this.configService.getOrThrow('MYSQL_HOST'),
      port: this.configService.getOrThrow('MYSQL_PORT'),
      username: this.configService.getOrThrow('MYSQL_USER'),
      password: this.configService.getOrThrow('MYSQL_PASSWORD'),
      database: this.configService.getOrThrow('MYSQL_DATABASE'),
      entities,
      synchronize: false, // Não usar em produção
    };
  }

  public static getInstance(configService?: ConfigService): SourceConnection {
    if (!SourceConnection.instance) {
      if (!configService) {
        throw new Error('ConfigService not provided');
      }

      SourceConnection.instance = new SourceConnection(configService);
    }

    return SourceConnection.instance;
  }
}
