import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor (
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, password: string): Promise<any>{
    const user = await this.userService.findByEmail(email);

    if(user && (await bcrypt.compare(password, user.password))){
      const result = user.toObject();
      return {
        email: result.email,
        userId: result._id
      };
    }

    return null;
  }

  async login(user: any){
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
