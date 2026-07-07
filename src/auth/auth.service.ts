import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/signup.dto';
import { Users } from '../users/schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { StoresService, ValidationMode } from '../stores/stores.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private storeService: StoresService,
    private jwtService: JwtService
  ) {}

  async signUp({ username, password, storeID,...signUpDto }: SignUpDto) {
    await this.storeService.getStoreByID(storeID, ValidationMode.FINDING);
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new BadRequestException('Username already exist.');
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        username,
        ...signUpDto,
        password: hashedPassword,
      });
      await newUser.save();
      const { password: _, ...result } = newUser.toObject();
      return result;
    }
  }

  async login(loginDto: LoginDto){
    const {username ,password } = loginDto;

    const user = await this.userModel.findOne({username}).select('+password');
    if (!user) { 
        throw new UnauthorizedException('Wrong username')
    }
    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password);
        
        if (correctPassword){
          const {password:_,...results}= user.toObject()
          const payload ={
            sub: results._id,
            username:results.username,
            storeid: results.storeID,
            usertype: results.userType
          }
          return{
            accessToken: this.jwtService.sign({payload},{expiresIn:'1h'})

          }
        }
        if (!correctPassword){
            throw new UnauthorizedException('Wrong passowrd or username');
        }
      }
    }
  }
