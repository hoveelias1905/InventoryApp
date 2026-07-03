import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { create } from 'domain';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post()
    @UsePipes(new ValidationPipe)
    createNewUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createNewUser(createUserDto);
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe)
    async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateUser(id, updateUserDto)
    }

    @Delete(':id')
    @UsePipes(new ValidationPipe)
    async deleteUser(@Param('id') id: string) {
        return await this.userService.deleteUser(id)
    }

    @Get('/all')
    @UsePipes(new ValidationPipe)
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get()
    @UsePipes(new ValidationPipe)
    async getUserByID(id: string) {
        return await this.userService.getUserByID(id)
    }
}
