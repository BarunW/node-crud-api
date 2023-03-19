import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({value} : TransformFnParams) => value.toLowerCase().trim().replace(/\s/g, ''))
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}


export class UserUpdateDto{

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform(({value} : TransformFnParams) => value.toLowerCase().trim())
  username: string;

  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  
  @IsOptional()
  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}