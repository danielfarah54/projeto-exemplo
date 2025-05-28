import { Controller, Get, Query } from '@nestjs/common';

import { PageDto } from '@/common/dtos/page.dto';
import { UserFilterDto } from '@/common/dtos/user-filter.dto';
import { User } from '@/entities';
import { UserService } from '@/services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(@Query() userFilterDto: UserFilterDto): Promise<PageDto<User>> {
    return this.userService.findAll(userFilterDto);
  }
}
