import { Global, Module } from '@nestjs/common';

import { entitiesProviders } from '@/database/providers';

@Global()
@Module({
  providers: [...entitiesProviders],
  exports: [...entitiesProviders],
})
export class CoreModule {}
