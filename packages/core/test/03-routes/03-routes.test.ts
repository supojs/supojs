import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('Routes', () => {
  test('Simple Route', async () => {
    const [err, res] = await to(axios.get(`${server.baseUrl}/simple`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a simple route');
  });

  test('Root route', async () => {
    const [err, res] = await to(axios.get(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a root route');
  });

  test('Nested simple route', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/nested/level-2/nested`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a nested route');
  });
});
