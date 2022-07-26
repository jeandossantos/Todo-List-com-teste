export class User {
  id?: string;
  name: string;
  initials: string;
  email: string;
  password: string;
  createdAt?: Date;

  constructor(props: User, id?: string) {
    Object.assign(this, props);

    if (id) {
      this.id = id;
    }
  }
}
