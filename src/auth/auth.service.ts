import { Injectable } from '@nestjs/common';
import { JwtService } from  '@nestjs/jwt';
import { UserService } from '../modules/users/users.service';
import { User } from '../modules/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }
    
    private async validate(userData: User): Promise<User> {
        return await this.userService.findByEmail(userData.email);
    }

    public async login(user: User): Promise< any | { status: number }>{
        return this.validate(user).then((userData)=>{
          if(!userData){
            return { status: 404 };
          }
          let payload = `${userData.name}${userData.id}`;
          const accessToken = this.jwtService.sign(payload);

          return {
             status: 200,
             expires_in: 3600,
             access_token: accessToken,
             user_id: payload
          };

        });
    }

    public async register(user: User): Promise<any>{
        return this.userService.create(user)
    }

    public async verify(token: string): Promise<{
        status: number,
        is_valid: boolean,
        message: object
    }>{
        var access_token = await token.replace("Bearer ", "");
        try {
            var verified = this.jwtService.verify(access_token)
            return {
                status: 200,
                is_valid: true,
                message: verified
            };
        } catch (error) {
            return {
                status: 401,
                is_valid: false,
                message: error
            }
        }
    }
}