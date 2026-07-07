import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto } from './dto/signup.dto';
import { Users } from '../users/schema/user.schema';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { StoresService } from '../stores/stores.service';
import { RefreshToken } from './schema/refreshTokens.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>,
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
        if (!correctPassword){
            throw new UnauthorizedException('Wrong passowrd or username');
        }
        if (correctPassword){
          const {password:_,...results}= user.toObject()
          const payload ={
            sub: results._id,
            username:results.username,
            storeid: results.storeID,
            usertype: results.userType
          }
          return await this.generateToken(payload)
        }
      }
    }
    async generateToken(payload){
      const refreshToken = uuidv4()
      const accessToken= this.jwtService.sign(payload,{expiresIn:'1d'})
      await this.storeRefreshToken(refreshToken,payload.sub)
      
      return{
            accessToken,
            refreshToken
          }
    }

    async refreshToken(token: string) {
    const refresh = await this.refreshTokenModel.findOne({
      token: token,
      expiryDate: { $gte: new Date() }
    });

    if (!refresh) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    const user = await this.userModel.findById(refresh.userID);
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    await this.refreshTokenModel.deleteOne({ _id: refresh._id });

    const payload = {
      sub: user._id,
      username: user.username,
      storeid: user.storeID,
      usertype: user.userType
    };

    return this.generateToken(payload);
  }



    async storeRefreshToken(refreshtoken: string, userID) {

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 3);

      await this.refreshTokenModel.create({refreshtoken, userID,expiryDate});
    }

  }
