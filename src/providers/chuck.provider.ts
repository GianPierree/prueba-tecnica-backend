import axios from 'axios';
import { JokeProvider } from '../interfaces/joke-provider.interface';

export class ChuckNorrisProvider implements JokeProvider {
  private readonly url = 'https://api.chucknorris.io/jokes/random';

  async getJoke(): Promise<string> {
    const { data } = await axios.get(this.url);
    return data.value;
  }
}