import { UserModel } from '../models/UserModel';

export class AuthService {
  private users: UserModel[] = [];

  register(email: string, password: string): UserModel {
    const user = new UserModel(email, password);
    this.users.push(user);
    return user;
  }

  login(email: string, password: string): UserModel | null {
    const user = this.users.find(u => u.email === email);
    if (user && user.validatePassword(password)) {
      return user;
    }
    return null;
  }
}
