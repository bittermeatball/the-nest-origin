import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../modules/users/user.entity';
import { UserService } from '../modules/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]),
    JwtModule.register({
        secret: 'secret12356789'
    })
    ],
    providers: [
        AuthService,
        UserService
    ],
    controllers: [AuthController]
})
export class AuthModule { }