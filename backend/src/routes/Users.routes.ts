import { Router } from 'express';
import { getConnectionManager } from 'typeorm';

// Cria o roteador da API
const UserRoutes = Router();
// console.log(getConnectionManager());

// const userService = Container.get('UserService');

// UserRoutes.get('/', userService.GetAll);
// UserRoutes.get('/:id', userService.Get);
// UserRoutes.post('/', userService.Post);
// UserRoutes.put('/:id', userService.Put);
// UserRoutes.delete('/:id', userService.Delete);

export default UserRoutes;
