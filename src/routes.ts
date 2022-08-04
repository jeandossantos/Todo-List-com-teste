import { Request, Response, Router } from 'express';
import {
  authenticateUserController,
  createTaskController,
  createUserController,
  findTasksByNameController,
  removeTaskController,
  removeUserController,
  updateTaskController,
  updateUserController,
} from './useCases';

const routes = Router();

routes.post('/authenticate', (req: Request, res: Response) => {
  return authenticateUserController.handle(req, res);
});

routes.post('/users', (req: Request, res: Response) => {
  return createUserController.handle(req, res);
});

routes.put('/users/:userId', (req: Request, res: Response) => {
  return updateUserController.handle(req, res);
});

routes.delete('/users/:userId', (req: Request, res: Response) => {
  return removeUserController.handle(req, res);
});

routes.post('/tasks', (req: Request, res: Response) => {
  return createTaskController.handle(req, res);
});

routes.put('/tasks/:taskId', (req: Request, res: Response) => {
  return updateTaskController.handle(req, res);
});

routes.get('/tasks', (req: Request, res: Response) => {
  return findTasksByNameController.handle(req, res);
});

routes.delete('/tasks/:taskId', (req: Request, res: Response) => {
  return removeTaskController.handle(req, res);
});

export { routes };
