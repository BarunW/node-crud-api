import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController{
  constructor(
    private readonly userService: UserService
  ){}

  @ApiOperation({summary: 'Create User'})
  @Post('/create')
  async createUser(@Body() userPayload: UserDto){
    return await this.userService.createUser(userPayload);
  }

  @ApiOperation({summary: 'Update User'})
  @Patch('/update/:id')
  async updateUserById(@Body() userUpdatePayload: UserDto, @Param('id') id: string){
    return await this.userService.updateUserById(id, userUpdatePayload);
  }

  @ApiOperation({summary: 'Get User By Id'})
  @Get('/get/:id')
  async getUserById(@Param('id') id: string){
    return await this.userService.getUserById(id);
  }

  @ApiOperation({summary: 'Get All Users'})
  @Get('/get')
  getUsers(){
    return this.userService.getUsers();
  }

  @ApiOperation({summary: 'Delete User'})
  @Delete('/delete/:id')
  async deleteUserById(@Param('id') id: string){
    return await this.userService.deleteUserById(id);
  }
}