import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Label } from './entites/label.entity';
import { Question } from './entites/question.entity';
import { User } from './entites/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './users/users.module';

require('dotenv').config();

const defaultOptions = {
    type: 'postgres' as 'postgres',
    port: 5432,
    username: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    synchronize: true,
};

@Module({
    imports: [
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageQuestionsUsersConnection',
            database: 'saas_ms_manage_questions_users',
            entities: [User],
        }),
        TypeOrmModule.forRoot({
            ...defaultOptions,
            name: 'msManageQuestionsQuestionsConnection',
            database: 'saas_ms_manage_questions_questions',
            entities: [Question, Label],
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService, JwtStrategy],
})
export class AppModule { }