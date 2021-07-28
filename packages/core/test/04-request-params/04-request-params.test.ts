import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('Request Params', () => {
  test('Route with params', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/with-path-params-aaaa-bbbb`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual({
      param1: 'aaaa',
      param2: 'bbbb',
    });
  });

  test('Nested route with folder params', async () => {
    const [err, res] = await to(
      axios.get(
        `${server.baseUrl}/nested/level-three/nested-with-folder-params-aaaa`
      )
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual({
      level: 'three',
      param1: 'aaaa',
    });
  });

  test('Route with query params', async () => {
    const [err, res] = await to(
      axios.get(`${server.baseUrl}/with-query-params?param1=a&param2=b`)
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual({
      param1: 'a',
      param2: 'b',
    });
  });

  test('Route with json body', async () => {
    const [err, res] = await to(
      axios.post(`${server.baseUrl}/with-json-body`, {
        param1: 'a',
        param2: 'b',
      })
    );

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual({
      param1: 'a',
      param2: 'b',
    });
  });
});
