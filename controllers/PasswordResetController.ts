import { AuthService } from '../services/AuthService';
import { Request, Response } from 'express';

const authService = new AuthService();

export class PasswordResetController {
  requestReset(req: Request, res: Response): void {
    const { email } = req.body;
    authService.requestPasswordReset(email);
    res.status(200).json({ message: 'Password reset link has been sent if the email exists in our system.' });
  }
}
