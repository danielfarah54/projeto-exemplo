import { Inject, Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';

import { PageOptionsDto } from '@/common/dtos/page-options.dto';
import { USER_REPOSITORY } from '@/database/providers/constants';
import { User } from '@/entities/user/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<User>
  ) {}

  async findAll(
    filters: { searchTerm?: string },
    paginationOptions: PageOptionsDto
  ): Promise<{ entities: User[]; itemCount: number }> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters.searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(user.name) LIKE :name', { name: `%${filters.searchTerm.toLowerCase()}%` }).orWhere(
            'LOWER(user.email) LIKE :email',
            { email: `%${filters.searchTerm.toLowerCase()}%` }
          );
        })
      );
    }

    queryBuilder
      .orderBy('user.createdAt', paginationOptions.order)
      .skip((paginationOptions.page - 1) * paginationOptions.take)
      .take(paginationOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    return { entities, itemCount };
  }
}
