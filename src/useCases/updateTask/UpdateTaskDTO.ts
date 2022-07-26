export default interface UpdateTaskDTO {
  id: string;
  userId: string;
  name: string;
  description?: string;
  deadline?: Date;
  done: boolean;
}
