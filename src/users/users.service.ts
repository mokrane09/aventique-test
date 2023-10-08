import { ConflictException, Injectable, NotFoundException  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user: User = new User(uuidv4(), 
      createUserDto.firstName, 
      createUserDto.lastName, 
      createUserDto.birthDate, 
      createUserDto.email, 
      hashedPassword);

      const createdUser: User = this.usersRepository.create(user);

    return createdUser;
  }

  findAll(): User[] {
    return this.usersRepository.findAll();
  }

  findOne(id: string): User {
    const user = this.usersRepository.findOne(id);
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = this.usersRepository.findOne(id);
    if(!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user = this.usersRepository.findOneByEmail(updateUserDto.email);
    if(user && user.id !== id) {
      throw new ConflictException(`Email ${updateUserDto.email} is already in use.`)
    }
    
    updateUserDto.password = await this.hashPassword(updateUserDto.password);

    const updatedUser: User = this.usersRepository.update(id, updateUserDto);

    return updatedUser;
  }

  remove(id: string) {
    if(!this.usersRepository.remove(id)) {
      throw new NotFoundException(`User with ID ${id} not found`);
    } else {
      return true;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
