export class Container {
  
  private services = {};

  async get(paramName: string) {
    const { default: service } = await import(this.services[paramName.toLowerCase()]);
    return new service();
  }

  add(paramName: string, service: any) {
    this.services[paramName.toLowerCase()] = service;
  }
}
