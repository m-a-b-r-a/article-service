import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FilterUserDto } from './dto/filtered-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findAll() {
    return await this.userRepo.find();
  }

  // findFilteredUser(filterUserDto:FilterUserDto){
  //   const {name,email} = filterUserDto;

  //   if(name || email){
  //     return this.userRepo.find({
  //       where:[
  //         {name:Like(`%${name}%`)},
  //         {email:Like(`%${email}%`)}
  //       ]
  //     })
  //   }
  // }

  async findOne(id: number) {
    return await this.userRepo.find({where:{id}});
  }

  async update(id: number, updateUserDto: Partial<UpdateUserDto>) {
    await this.userRepo.update({id},UpdateUserDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepo.delete({id});
    return {deleted:true};
  }
}
