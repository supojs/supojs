
import { Repository } from "@supojs/core";

export default class InMemoryRepository<T> extends Repository<T> {
  resouces = {};

  persist(resource) {
    this.resouces[resource.id] = resource;
  }

  find(id): T {
    return this.resouces[id];
  }
}
