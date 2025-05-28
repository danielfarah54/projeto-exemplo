import { Global, Module } from '@nestjs/common';

import { databaseProviders } from '@/config/database/typeorm.config';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
