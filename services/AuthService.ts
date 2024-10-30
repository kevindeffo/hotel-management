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

  requestPasswordReset(email: string): void {
    const user = this.users.find(u => u.email === email);
    if (user) {
      user.resetPasswordToken = this.generateResetToken();
      // Envoyer un email avec le lien de réinitialisation contenant le token
      console.log(`Send password reset link to ${email} with token ${user.resetPasswordToken}`);
    }
  }

  private generateResetToken(): string {
    return Math.random().toString(36).substring(2);
  }
}
