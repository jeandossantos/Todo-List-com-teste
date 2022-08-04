export default interface CreateTaskDTO {
  userId: string;
  name: string;
  description?: string;
  deadline?: Date;
  done?: boolean;
}
