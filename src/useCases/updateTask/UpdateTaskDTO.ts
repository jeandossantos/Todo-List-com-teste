export default interface UpdateTaskDTO {
  id: string;
  name: string;
  description?: string;
  deadline?: Date;
  done: boolean;
}
