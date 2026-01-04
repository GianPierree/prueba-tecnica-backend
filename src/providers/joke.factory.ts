import { JokeProvider } from '../interfaces/joke-provider.interface';
import { ChuckNorrisProvider } from './chuck.provider';
import { DadJokeProvider } from './dad.provider';

export class JokeProviderFactory {
  private static providers: Record<string, JokeProvider> = {
    'chuck': new ChuckNorrisProvider(),
    'dad': new DadJokeProvider(),
  };

  static getProvider(source: string): JokeProvider {
    let key = source.toLowerCase().trim();

    if (!key) {
      const keys = Object.keys(this.providers);
      const randomIndex = Math.floor(Math.random() * keys.length);
      key = keys[randomIndex];
    }

    const provider = this.providers[key];

    if (!provider) {
      throw new Error(`Proveedor desconocido: ${source}. Usa 'Chuck' o 'Dad'.`);
    }

    return provider;
  }
}