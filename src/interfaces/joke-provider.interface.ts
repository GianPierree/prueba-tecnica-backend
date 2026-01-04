export interface JokeProvider {
  getJoke(): Promise<string>;
}