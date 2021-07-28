import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('01-hello-world', () => {
  test('Hello World route', async () => {
    const [err, res] = await to(axios.get(`${server.baseUrl}/hello-world`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('Hello world!');
  });
});
