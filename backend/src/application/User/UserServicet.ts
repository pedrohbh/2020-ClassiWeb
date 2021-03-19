import { Request, Response } from 'express';

import { IUserDAO } from '../../persistence/UserDAO';

export class UserService {
  constructor(private userDao: IUserDAO) {}

  async GetAll(request: Request, response: Response) {
    return response.status(200).json([]);
  }

  async Post(request: Request, response: Response) {
    const newUser = await this.userDao.Create(request.body);

    return response.status(200).json(newUser);
  }
}
