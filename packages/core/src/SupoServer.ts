import { readdirSync, statSync, existsSync } from 'fs';
import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Container } from './Container';
import { RequestParams } from './RequestParams';
import { URL } from 'url';

export class SupoServer {
  public baseUrl: string;
  private server: Server;

  constructor(path = '.') {
    const hostname = '127.0.0.1';
    const port = 3000;
    this.baseUrl = `http://${hostname}:${port}`;

    const container = this.buildContainer(`${path}/src/`);

    const routes = this.walk(`${path}/src/routes`);
    //routes.push(...this.walkResources(`${path}/src/resources`));

    this.server = createServer(
      async (req: IncomingMessage, res: ServerResponse) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');

        const url = new URL(req.url, this.baseUrl);
        let pathname = url.pathname;

        try {
          pathname += pathname.endsWith('/') ? 'index' : '';
          pathname += `.${req.method.toLowerCase()}`;

          const route = routes.find((route) =>
            new RegExp(route.regex).test(pathname)
          );
          const routeWithParams = new RegExp(route.regex, 'g').exec(pathname);

          const { default: controller } = await import(route.file);
          //const { default: resource } = await import(route.resourceClass);

          const requestParams = new RequestParams(
            routeWithParams.groups,
            Object.fromEntries(url.searchParams),
            JSON.parse(req.read())
          );
          
          const params = [];
          for(let paramName of this.getParamNames(controller)) {
            params.push(paramName === 'params' ? requestParams : await container.get(paramName));
          }
          
          const response = await controller(
            ...params
          );
          res.end(JSON.stringify(response, null, 2));
        } catch (error) {
          res.statusCode = 404;
          res.end();
          console.log(error);
        }
      }
    );

    this.server.listen(port, hostname, () => console.log(`Server ready at http://${hostname}:${port}`));
  }

  buildContainer(dir: string) {
    const container = new Container();

    if(!existsSync(`${dir}services`)) {
      return container;
    }

    const list = readdirSync(`${dir}services`);

    for (let file of list) {
      file = `${dir}services/` + file;
      const resourceClass = file
        .split('src/services/')[1]
        .replace('.ts', '');

      container.add(resourceClass.split('.').join('').split('-').join(''), file);
    }

    return container;
  }

  close() {
    this.server.close();
    return new Promise((resolve) =>
      this.server.once('close', () => resolve(null))
    );
  }

  walk(dir) {
    var results = [];
    var list = readdirSync(dir);
    const reg = /\[[^\]]+\]/g;

    list.forEach((file) => {
      file = dir + '/' + file;
      var stat = statSync(file);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        const route = file.replace('.ts', '');
        results.push({
          file,
          regex:
            '^' +
            route
              .split('src/routes')[1]
              .replace(
                reg,
                (param) => `(?<${param.substring(1, param.length - 1)}>.+)`
              ),
          params: route.match(reg),
        });
      }
    });
    return results;
  }

  walkResources(dir) {
    let results = [];
    const list = readdirSync(dir);
    const reg = /\[[^\]]+\]/g;
    const methods = ['index.get', '[id].get', 'index.post', 'update.put'];

    for (let file of list) {
      file = dir + '/' + file;
      var stat = statSync(file);

      if (stat && stat.isDirectory()) {
        results = results.concat(this.walk(file));
      } else {
        for (let method of methods) {
          const route = file.toLowerCase().replace('.ts', '') + `s/${method}`;
          results.push({
            file: './resources-routes/' + method + '.ts',
            regex:
              '^' +
              route
                .split('src/resources')[1]
                .replace(
                  reg,
                  (param) => `(?<${param.substring(1, param.length - 1)}>.+)`
                ),
            params: route.match(reg),
            resourceClass: file,
          });
        }
      }
    }

    return results;
  }

  STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
  ARGUMENT_NAMES = /([^\s,]+)/g;

  getParamNames(func) {
    var fnStr = func.toString().replace(this.STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(this.ARGUMENT_NAMES);
    if(result === null)
      result = [];
    return result;
  }
}
