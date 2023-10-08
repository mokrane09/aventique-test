import { Injectable } from '@nestjs/common';
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

  update(id: string, user: Partial<User>): User | null  {
    console.log(user);
    const users = this.readJsonDatabase();
    const index = users.findIndex(user => user.id === id);
    if (index > -1) {
        users[index] = { ...users[index], ...user };
        this.writeJsonDatabase(users);
        return users[index];
    }

    return null;
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
