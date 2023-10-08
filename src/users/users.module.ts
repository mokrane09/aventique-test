import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, TransformInterceptor],
})
export class UsersModule {}
