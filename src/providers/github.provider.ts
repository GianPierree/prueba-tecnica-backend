import axios from 'axios';
import { IAuthProvider, ExternalUser } from '../interfaces/auth-provider.interface';

export class GitHubAuthProvider implements IAuthProvider {
  
  async getAuthenticatedUser(code: string): Promise<ExternalUser> {
    try {
      const clientID = process.env.GITHUB_CLIENT_ID;
      const clientSecret = process.env.GITHUB_CLIENT_SECRET;

      if (!clientID || !clientSecret) {
        throw new Error('Error de Configuración: GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET no están definidos en el .env');
      }

      const tokenUrl = 'https://github.com/login/oauth/access_token';
      const tokenResponse = await axios.post(tokenUrl, {
        client_id: clientID,
        client_secret: clientSecret,
        code: code
      }, {
        headers: { Accept: 'application/json' }
      });

      if (tokenResponse.data.error) {
        throw new Error(`GitHub Error: ${tokenResponse.data.error_description}`);
      }

      const accessToken = tokenResponse.data.access_token;

      const userUrl = 'https://api.github.com/user';
      const userResponse = await axios.get(userUrl, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      const ghUser = userResponse.data;

      return {
        id: String(ghUser.id),
        name: ghUser.name || ghUser.login,
        email: ghUser.email || `${ghUser.login}@github.mock`,
        provider: 'github'
      };

    } catch (error: any) {
      console.error('Error en GitHubProvider:', error.message);
      throw new Error('Falló la autenticación con GitHub');
    }
  }
}