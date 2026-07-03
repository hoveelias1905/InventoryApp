import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/user.schema';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt'
import { Stores } from '../stores/schema/store.schema';
import { StoresService } from '../stores/stores.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private userModel: Model<Users>,@InjectModel(Stores.name) private storesModel: Model<Stores>,private storeService:StoresService) { }
    async createNewUser({ username, storeID,...createUserDto }: CreateUserDto) {
        await   this.validateUsername(username);
      await  this.storeService.getStoreByID(storeID);

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
        const newUser = new this.userModel({
            username, ...createUserDto, password: hashedPassword,storeID:storeID
        })
        await newUser.save()
        const { password: _, ...result } = newUser.toObject()
        return result;
    }
    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        this.getUserByID(id)
        const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto)
        return updatedUser;

    }
    async getAllUsers() {
        return await this.userModel.find()
    }

    async getUserByID(id: string) {
        this.validateID(id)
        const user = await this.userModel.findById(id)

        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user;
    }

    async deleteUser(id: string) {
        this.getUserByID(id)
        return await this.userModel.findByIdAndDelete(id)
    }

    validateID(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new HttpException('Invalid ObjectID', 401)
        }

    }

    async validateUsername(username: string) {
        const user = await this.userModel.findOne({ username })
        if (user) {
            throw new ConflictException('User with this username already  exists')
        }
    }


}
