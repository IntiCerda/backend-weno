import { Module } from '@nestjs/common';
import { UserTestResolver } from './userTest.resolver';
import { UserTestService } from './userTest.service';

@Module({
  providers: [UserTestService, UserTestResolver],
})
export class UserTestModule {}