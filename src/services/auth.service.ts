import jwt from 'jsonwebtoken';
import { LoginDto } from '../dtos/auth.dto';

export class AuthService {
  private readonly MOCK_USER = {
    id: 1,
    username: 'admin',
    password: 'password123',
    role: 'ADMIN'
  };

  async login(credentials: LoginDto) {
    if (
      credentials.username !== this.MOCK_USER.username || 
      credentials.password !== this.MOCK_USER.password
    ) {
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      sub: this.MOCK_USER.id,
      username: this.MOCK_USER.username,
      role: this.MOCK_USER.role
    };

    const secret = process.env.JWT_SECRET || 'secreto_por_defecto';

    const token = jwt.sign(payload, secret);

    return {
      user: { username: this.MOCK_USER.username, role: this.MOCK_USER.role },
      token
    };
  }
}