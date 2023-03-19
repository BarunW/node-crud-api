import { User } from "../../model/user.model";

export const userSample = () : User =>{
  return {
    username: 'test',
    email:'test@gmail.com',
    password:'Test@1234567'
  }
}