import axios from 'axios';
import { JokeProvider } from '../interfaces/joke-provider.interface';

export class DadJokeProvider implements JokeProvider {
  private readonly url = 'https://icanhazdadjoke.com/';

  async getJoke(): Promise<string> {
    const { data } = await axios.get(this.url, {
      headers: { Accept: 'application/json' }
    });
    return data.joke;
  }
}