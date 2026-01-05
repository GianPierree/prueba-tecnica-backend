import jwt from 'jsonwebtoken';
import { LoginDto } from '../dtos/auth.dto';
import { AuthProviderFactory } from '../providers/auth.factory';

export class AuthService {

  //* Mock par el login local
  private readonly USERS_DB = [
    {
      id: 1,
      username: 'admin',
      password: 'password123',
      name: 'Administrador',
      email: 'admin@empresa.com',
      role: 'admin'
    },
    {
      id: 2,
      username: 'user',
      password: 'user123',
      name: 'Empleado',
      email: 'user@empresa.com',
      role: 'user'
    }
  ];

  //* Mock para el login externo
  private users: any[] = [{ id: 1, email: 'admin@test.com', name: 'Admin', role: 'admin' }];

  async login(credentials: LoginDto) {
    const user = this.USERS_DB.find(u => 
      u.username === credentials.username && 
      u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'secreto_por_defecto';

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return { 
      token, 
      user: { 
        name: user.name, 
        role: user.role 
      } 
    };
  }

  async loginExternal(providerName: string, code: string) {
    const authProvider = AuthProviderFactory.getProvider(providerName);
    const externalUser = await authProvider.getAuthenticatedUser(code);

    let user = this.users.find(u => u.email === externalUser.email);

    if (!user) {
      user = {
        id: externalUser.id,
        email: externalUser.email,
        name: externalUser.name,
        role: 'user',
        provider: externalUser.provider
      };
      this.users.push(user);
    }

    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    const secret = process.env.JWT_SECRET || 'secreto';
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    return { token, user };
  }
}