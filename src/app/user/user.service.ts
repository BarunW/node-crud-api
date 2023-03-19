import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { UserDto, UserUpdateDto } from "./dto/user.dto";
import { User } from "./model/user.model";
import * as bcrypt from 'bcrypt';
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class UserService{
    constructor(
      @InjectModel(User.name)
      private userModel : Model<User>
    ){}

  async createUser(userPayload: UserDto):Promise<{"statusCode":number,"message":string,"user_id":string}>{
    const findUser = await this.userModel.findOne({$or : [{email: userPayload.email } ,{username: userPayload.username}]});
    if(findUser){
        if(findUser.username === userPayload.username){
          throw new ConflictException("Username already exists");
        }
        // return {"message": "Email already exists"};
        throw new ConflictException("Email already exists");
    }

    try{
      const hashedPassword = await bcrypt.hash(userPayload.password, 10);
      const newUser = await this.userModel.create({...userPayload, password: hashedPassword});
      return {"statusCode":201,"message": "User Created Successfully", "user_id":newUser._id.toString()};
    }
    catch(err){
      throw new Error("There is an Internal Error")
    }
  }

  async getUsers():Promise<UserDto[]>{
    try{
      const users = await this.userModel.find({},{password:0});// password:0 means password will not be returned
      return users;
    }catch(err){
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async getUserById(id: string):Promise<UserDto>{
    try{
      const user = await this.userModel.findById(id,{password:0}); // password:0 means password will not be returned
      if(!user){
        throw new NotFoundException();
      }
      return user;
    }catch(err){
      if(err.code == 404){
        throw new NotFoundException('User Not Found');
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async updateUserById(id: string, userUpdatePayload: UserUpdateDto):Promise<{"statusCode":number,"message":string}>{
    try{
      const user = await this.userModel.findByIdAndUpdate(id, userUpdatePayload);
      if(!user){
        throw new NotFoundException();
      }
      return {"statusCode":200,"message": "User Updated Successfully"};
      }catch(err){
        if(err.code == 404){
          throw new NotFoundException('User Not Found');
        }
        throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async deleteUserById(id: string):Promise<{"statusCode":number,"message":string}>{
    try{
      const user = await this.userModel.findByIdAndDelete(id);
      if(!user){
        throw new NotFoundException();
      }
      return {"statusCode":200,"message": "User Deleted Successfully"};
      } catch(err){
        if(err.code == 404){
          throw new NotFoundException('User Not Found');
        }
        throw new InternalServerErrorException('Internal Server Error');
    }
  }

     
}