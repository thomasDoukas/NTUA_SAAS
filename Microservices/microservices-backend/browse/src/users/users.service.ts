import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(@InjectEntityManager('msBrowseUsersConnection') private manager: EntityManager) { }

    // Remove findAllUsers

    // // Create single user
    // async createUser(createUserDto: CreateUserDto): Promise<User> {
    //     return this.manager.transaction(async manager => {
    //         const userExists = await manager.findOne(User, { where: { email: createUserDto.email } });
    //         if (userExists) throw new ConflictException(`Email ${createUserDto.email} already exists!`);
    //         const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    //         const newUserDto = { ...createUserDto, password: hashedPassword };
    //         const newUser = await manager.create(User, newUserDto);
    //         return await manager.save(newUser);
    //     })
    // }

    // // Returns all users in database
    // async findAllUsers(): Promise<User[]> {
    //     return await this.manager.find(User)
    // }

    // Returns userId
    async findOneUser(userId: number): Promise<User> {
        const userExists = await this.manager.findOne(User, userId);
        if (!userExists) throw new NotFoundException(`User not found!`);
        return userExists;
    }

    // // Update user
    // async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    //     return this.manager.transaction(async manager => {
    //         const userExists = await manager.findOne(User, userId);
    //         if (!userExists) throw new NotFoundException(`User ${userId} not found`);
    //         // To update email
    //         if (updateUserDto.email && updateUserDto.email !== userExists.email) {
    //             // We need to know whether new mail is being used or not
    //             const emailUsed = await manager.findOne(User, { where: { email: updateUserDto.email } });
    //             if (emailUsed) throw new ConflictException(`Email ${updateUserDto.email} already being used!`);
    //         }
    //         manager.merge(User, userExists, updateUserDto);
    //         return await manager.save(userExists);
    //     })
    // }

    // // Delete user
    // async removeUser(userId: number): Promise<any> {
    //     return this.manager.transaction(async manager => {
    //         const userExists = await manager.findOne(User, userId);
    //         if (!userExists) throw new NotFoundException(`User not found!`);
    //         return await manager.delete(User, userId);
    //     })
    // }

    // Use email to find user
    async findUserFromEmail(email: string): Promise<User> {
        const userExists = await this.manager.findOne(User, { where: { email: email } });
        if (!userExists) throw new NotFoundException(`User not found`);
        return userExists;
    }
}
