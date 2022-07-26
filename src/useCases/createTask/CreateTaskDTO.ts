export default interface CreateTaskDTO {
  name: string;
  description?: string;
  deadline?: Date;
  done?: boolean;
}
