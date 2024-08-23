import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.chema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<User> {
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  };

  async findByEmail(email: string): Promise<UserDocument>{
    return this.userModel.findOne({ email }).exec();
  };

}
