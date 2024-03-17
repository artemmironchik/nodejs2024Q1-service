import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { isUUID } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getAllUsers() {
    const users = this.userRepository.getAllUsers();

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });
  }

  findUserById(id: string) {
    this.isIdValid(id);

    const user = this.isUserExists(id);

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  createUser(userData: CreateUserDto) {
    const { password, ...userWithoutPassword } =
      this.userRepository.createUser(userData);

    return userWithoutPassword;
  }

  updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    this.isIdValid(id);

    const user = this.isUserExists(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const { password, ...userWithoutPassword } =
      this.userRepository.updateUserPassword(id, newPassword);

    return userWithoutPassword;
  }

  deleteUser(id: string) {
    this.isIdValid(id);

    this.isUserExists(id);

    return this.userRepository.deleteUser(id);
  }

  private isIdValid(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid user id ${id}`);
    }
  }

  private isUserExists(id: string) {
    const user = this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
