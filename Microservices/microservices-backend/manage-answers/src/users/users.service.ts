import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectEntityManager('msManageAnswersUsersConnection') private manager: EntityManager
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        return this.manager.transaction(async manager => {
            const newUser = await manager.create(User, createUserDto);
            return await manager.save(newUser);
        })
    }

    async updateUser(payload): Promise<User> {
        // payload = {userId, updateUser}
        return this.manager.transaction(async manager => {
            const userExists = await manager.findOne(User, payload.userId);
            manager.merge(User, userExists, payload.updateUserDto)
            return await manager.save(userExists);
        })
    }

    async removeUser(userId: number): Promise<any> {
        return await this.manager.delete(User, userId);
    }

    // Use email to find user
    async findUserFromEmail(email: string): Promise<User> {
        const userExists = await this.manager.findOne(User, { where: { email: email } });
        if (!userExists) throw new NotFoundException(`User not found`);
        return userExists;
    }
}
