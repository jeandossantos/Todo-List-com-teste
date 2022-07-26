export class Task {
  id?: string;
  userId: string;
  name: string;
  description?: string;
  deadline?: Date;
  done?: boolean;
  createdAt?: Date;

  constructor(props: Task, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
