import { Test, TestingModule } from "@nestjs/testing";
import { UserDto } from "../dto/user.dto";
import { User } from "../model/user.model";
import { UserController } from "../user.controller";
import { UserService } from "../user.service";
import { userSample } from "./sample/user.sample";

jest.mock('../user.service');

describe('UserController',() =>{

  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService]
    })
    .compile();
    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    jest.clearAllMocks();
  })

  describe('getUsers', () => {
    describe('when getUsers is called', () => {
      let user:UserDto[];

      beforeEach( async () => {
        user = await userController.getUsers();
      })

      test('then it should call userService.getUsers', () => {
        expect(userService.getUsers).toHaveBeenCalled();
      })

      test('then it should return an array of users', () => {
        expect(user).toEqual([userSample()]);
      })
    })
  })

 

})