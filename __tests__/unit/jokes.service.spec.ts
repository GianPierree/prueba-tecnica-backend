import { JokesService } from '../../src/services/jokes.service';
import { JokeProviderFactory } from '../../src/providers/joke.factory';

const mockRepo = {
  create: jest.fn(),
  findAll: jest.fn()
} as any;

describe('Jokes Service Unit', () => {
  let service: JokesService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new JokesService(mockRepo);
  });

  it('Create: debería fallar si el contenido es muy corto', async () => {
    const badDto = { content: 'Hi', author_id: 1, theme_id: 1 } as any;
    await expect(service.createJoke(badDto)).rejects.toThrow();
  });

  it('External: debería obtener chiste usando el Factory', async () => {
    const mockProvider = { getJoke: jest.fn().mockResolvedValue('Joke Fake') };
    jest.spyOn(JokeProviderFactory, 'getProvider').mockReturnValue(mockProvider as any);

    const result = await service.findJokeBySource('Chuck');
    
    expect(result.jokes).toBe('Joke Fake');
    expect(result.source).toBe('Chuck');
  });
});