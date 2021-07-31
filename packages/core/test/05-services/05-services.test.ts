import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('Services', () => {
  test('Route with simple service injected', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/simple-injected`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('simple');
  });

  test('Route with dot in name service [foo.service] injected', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/foo-injected`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('bar');
  });

  test('Route with dots and - service [multi-word.service-test.wow] injected', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/multi-word-injected`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('multi');
  });
});
