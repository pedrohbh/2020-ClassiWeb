import { Router } from 'express';

import { UserService } from '../application/User/UserServicet';
import { IUserDAO } from '../persistence/UserDAO';

// Inject UserService with TypeDI
const userService = new UserService({} as IUserDAO);

// Cria o roteador da API
const UserRoutes = Router()
  .get('/', userService.GetAll)
  .get('/:id', userService.Get)
  .post('/', userService.Post)
  .put('/:id', userService.Put)
  .delete('/:id', userService.Delete);

export default UserRoutes;
