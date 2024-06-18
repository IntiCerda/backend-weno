import { Injectable } from '@nestjs/common';
import { UserTest } from './userTest.dto';

@Injectable()
export class UserTestService {
  private users: UserTest[] = [];

  findAll(): UserTest[] {
    return this.users;
  }
  
}