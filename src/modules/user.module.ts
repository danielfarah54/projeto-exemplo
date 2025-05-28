import { Global, Module } from '@nestjs/common';

import { UserController } from '@/controllers/user.controller';
import { UserRepository } from '@/repositories/user.repository';
import { UserService } from '@/services/user.service';

@Global()
@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
