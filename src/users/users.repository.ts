import { Injectable, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as dbConstants from './constants/db'

@Injectable()
export class UsersRepository {
    private readonly dbFilePath = path.join(__dirname, '../..', dbConstants.default.json_db_file_path);

  create(user: User) {
    const users = this.readJsonDatabase();
    users.push(user);
    this.writeJsonDatabase(users);
    return user;
  }

  findAll(): User[] {
    const users = this.readJsonDatabase();
    return users;;
  }

  findOne(id: string): User {
    const users = this.readJsonDatabase();
    return users.find(user => user.id === id) || null;;
  }

  findOneByEmail(email: string): User | null {
    const users = this.readJsonDatabase();
    return users.find(user => user.email === email) || null;
  }

  update(id: string, updateUser: Partial<User>): User | null  {
    const users = this.readJsonDatabase();

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
        return null;
    }

    const existingUser = users[userIndex];

    // if (updateUser.age !== undefined) {
    //     const currentYear = new Date().getFullYear();
    //     const birthYear = currentYear - updateUser.age;
    //     const existingBirthDate = new Date(existingUser.birthDate);
    //     existingBirthDate.setFullYear(birthYear);
    //     updateUser.birthDate = existingBirthDate.toISOString();
    // }

    // Update the user
    const updatedUser = { ...existingUser, ...updateUser };
    users[userIndex] = updatedUser;
    this.writeJsonDatabase(users);

    return updatedUser;
  }

  remove(id: string) {
    const users = this.readJsonDatabase();
    const userToDelete = users.find(user => user.id === id);

    if (!userToDelete) {
        return false;
    }

    const updatedUsers = users.filter(user => user.id !== id);
    this.writeJsonDatabase(updatedUsers);
    return true;
  }

  private readJsonDatabase(): User[] {
      const content = fs.readFileSync(this.dbFilePath, 'utf-8');
      return JSON.parse(content);
  }

  private writeJsonDatabase(users: User[]): void {
      const content = JSON.stringify(users, null, 2);
      fs.writeFileSync(this.dbFilePath, content, 'utf-8');
  }
}
