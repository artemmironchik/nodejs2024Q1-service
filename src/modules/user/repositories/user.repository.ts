import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { StoreService } from 'src/modules/store/services/store.service';
import { User } from '../types/user';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserRepository {
  private readonly users: User[] = null;

  constructor(private readonly storeService: StoreService) {
    this.users = this.storeService.getUsers();
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(userData: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      login: userData.login,
      password: userData.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);

    return newUser;
  }

  updateUserPassword(id: string, newPassword: string): User {
    const user = this.getUserById(id);

    if (user) {
      user.password = newPassword;
      user.version += 1;
      user.updatedAt = Date.now();
    }

    return user;
  }

  deleteUser(id: string): boolean {
    return this.storeService.deleteUser(id);
  }
}
