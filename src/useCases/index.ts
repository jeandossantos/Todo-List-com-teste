import { TaskRepository } from '../repositories/taskRepository/TaskRepository';
import { UserRepository } from '../repositories/userRepository/UserRepository';
import { AuthenticateUserController } from './authenticateUser/AuthenticateUserController';
import { AuthenticateUserUseCase } from './authenticateUser/AuthenticateUserUseCase';
import { CreateTaskController } from './createTask/CreateTaskController';
import { CreateTaskUseCase } from './createTask/CreateTaskUseCase';
import { CreateUserController } from './createUser/CreateUserController';
import { CreateUserUseCase } from './createUser/CreateUserUseCase';
import { FindTasksByNameController } from './findTasksByName/FindTasksByNameController';
import FindTasksByNameUseCase from './findTasksByName/FindTasksByNameUseCase';
import { RemoveTaskController } from './removeTask/RemoveTaskController';
import { RemoveTaskUseCase } from './removeTask/RemoveTaskUseCase';
import { RemoveUserController } from './removeUser/RemoveUserController';
import { RemoveUserUseCase } from './removeUser/RemoveUserUseCase';
import { UpdateTaskController } from './updateTask/UpdateTaskController';
import { UpdateTaskUseCase } from './updateTask/UpdateTaskUseCase';
import { UpdateUserController } from './updateUser/UpdateUserController';
import { UpdateUserUseCase } from './updateUser/UpdateUserUseCase';

const userRepository = new UserRepository();
const taskRepository = new TaskRepository();

const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

const createUserUseCase = new CreateUserUseCase(userRepository);
const createUserController = new CreateUserController(createUserUseCase);

const updateUserUseCase = new UpdateUserUseCase(userRepository);
const updateUserController = new UpdateUserController(updateUserUseCase);

const removeUserUseCase = new RemoveUserUseCase(userRepository);
const removeUserController = new RemoveUserController(removeUserUseCase);

const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const createTaskController = new CreateTaskController(createTaskUseCase);

const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const updateTaskController = new UpdateTaskController(updateTaskUseCase);

const findTasksByNameUseCase = new FindTasksByNameUseCase(taskRepository);
const findTasksByNameController = new FindTasksByNameController(
  findTasksByNameUseCase
);

const removeTaskUseCase = new RemoveTaskUseCase(taskRepository);
const removeTaskController = new RemoveTaskController(removeTaskUseCase);

export {
  authenticateUserController,
  createUserController,
  updateTaskController,
  updateUserController,
  removeUserController,
  createTaskController,
  findTasksByNameController,
  removeTaskController,
};
