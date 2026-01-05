import { IAuthProvider } from '../interfaces/auth-provider.interface';
import { GitHubAuthProvider } from './github.provider';

export class AuthProviderFactory {
  private static providers: Record<string, IAuthProvider> = {
    'github': new GitHubAuthProvider(),
  };

  static getProvider(providerName: string): IAuthProvider {
    const provider = this.providers[providerName.toLowerCase()];
    
    if (!provider) {
      throw new Error(`Proveedor de autenticación no soportado: ${providerName}`);
    }
    
    return provider;
  }
}