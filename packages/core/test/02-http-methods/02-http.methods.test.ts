import to from 'await-to-js';
import axios from 'axios';
import { SupoServer } from '../../src/SupoServer';

let server;

beforeAll(() => (server = new SupoServer(__dirname)));
afterAll(() => server.close());

describe('02-http-methods', () => {
  test('GET route', async () => {
    const [err, res] = await to(axios.get(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a GET route');
  });

  test('POST route', async () => {
    const [err, res] = await to(axios.post(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a POST route');
  });

  test('PUT route', async () => {
    const [err, res] = await to(axios.put(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a PUT route');
  });

  test('DELETE route', async () => {
    const [err, res] = await to(axios.delete(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a DELETE route');
  });

  test('POST route', async () => {
    const [err, res] = await to(axios.patch(`${server.baseUrl}/`));

    expect(err).toBeNull();
    expect(res.status).toEqual(200);
    expect(res.data).toEqual('This is a PATCH route');
  });
});
