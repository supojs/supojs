import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('Services', () => {
  test('Route with injected service', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/route-with-injected-service`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('bar');
  });
});
