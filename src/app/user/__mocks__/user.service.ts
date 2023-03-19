import { create } from "domain";
import { userSample } from "../test/sample/user.sample";

export const UserService = jest.fn().mockReturnValue({
  getUserById: jest.fn().mockResolvedValue(userSample()),
  getUsers: jest.fn().mockResolvedValue([userSample()]),
  createUser: jest.fn().mockResolvedValue({statusCode: 201, message: "User Created Successfully", user_id: "60e8b1c1b9b1b8b1b1b1b1b1"}),
  updateUserById: jest.fn().mockResolvedValue({statusCode: 201, message: "User Created Successfully", user_id: "60e8b1c1b9b1b8b1b1b1b1b1"}),
  deleteUserById: jest.fn().mockResolvedValue({statusCode: 201, message: "User Created Successfully", user_id: "60e8b1c1b9b1b8b1b1b1b1b1"}),
});