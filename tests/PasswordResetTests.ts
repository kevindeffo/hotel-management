import { AuthService } from '../services/AuthService';

describe('AuthService Password Reset', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  it('should generate a reset token and send email', () => {
    spyOn(console, 'log');
    const email = 'test@example.com';
    service.register(email, 'password123');
    service.requestPasswordReset(email);
    expect(console.log).toHaveBeenCalledWith(jasmine.stringMatching(`Send password reset link to ${email}`));
  });

  it('should handle non-existing email gracefully', () => {
    spyOn(console, 'log');
    const email = 'nonexistent@example.com';
    service.requestPasswordReset(email);
    expect(console.log).not.toHaveBeenCalledWith(jasmine.stringMatching(`Send password reset link to ${email}`));
  });
});
