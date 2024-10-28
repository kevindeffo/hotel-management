export class UserModel {
  constructor(
    public email: string,
    public password: string,
    public id?: string
  ) {}

  validatePassword(inputPassword: string): boolean {
    // Assurez-vous de jamais stocker le mot de passe en clair dans une application réelle
    return this.password === inputPassword;
  }
}
