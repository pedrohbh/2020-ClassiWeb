import { Request, Response } from 'express';

import { IUserDAO } from '../../persistence/UserDAO';

export class UserService {
  constructor(private userDao: IUserDAO) {}

  async GetAll(request: Request, response: Response) {
    const allUsers = await this.userDao.GetAll();

    return response.status(200).json(allUsers);
  }

  async Get(request: Request, response: Response) {
    const { id } = request.params;
    const user = await this.userDao.Get(id);

    return response.status(200).json(user);
  }

  async Post(request: Request, response: Response) {
    const newUser = await this.userDao.Create(request.body);

    return response.status(200).json(newUser);
  }

  async Put(request: Request, response: Response) {
    const { id } = request.params;
    const updatedUser = await this.userDao.Update({ ...request.body, id });

    return response.status(200).json(updatedUser);
  }

  async Delete(request: Request, response: Response) {
    const { id } = request.params;
    await this.userDao.Detele(id);

    return response.status(204).send();
  }
}
