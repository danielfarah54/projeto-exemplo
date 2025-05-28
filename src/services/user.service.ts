import { Injectable } from '@nestjs/common';

import { PageMetadataDto } from '@/common/dtos/page-metadata.dto';
import { PageDto } from '@/common/dtos/page.dto';
import { UserFilterDto } from '@/common/dtos/user-filter.dto';
import { User } from '@/entities';
import { UserRepository } from '@/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({ order, page, take, ...filters }: UserFilterDto): Promise<PageDto<User>> {
    const paginationOptions = {
      page,
      order,
      take,
    };

    const { entities, itemCount } = await this.userRepository.findAll(filters, paginationOptions);
    const pageMetadataDto = new PageMetadataDto({ itemCount, pageOptionsDto: paginationOptions });

    return new PageDto(entities, pageMetadataDto);
  }
}
