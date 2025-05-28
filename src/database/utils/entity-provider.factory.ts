import { FactoryProvider } from '@nestjs/common';
import { DataSource, EntitySchema, ObjectType, Repository } from 'typeorm';

import { DatabaseConnection } from '@/config/database/typeorm.config';

type EntityType<Entity> = ObjectType<Entity> | EntitySchema<Entity> | string;

export function entityProviderFactory<Entity>(
  provide: FactoryProvider['provide'],
  entity: EntityType<Entity>
): FactoryProvider<Repository<Entity>> {
  return {
    provide,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(entity),
    inject: [DatabaseConnection],
  };
}
