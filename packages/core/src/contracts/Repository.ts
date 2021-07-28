export default abstract class Repository<T> {
  constructor(protected resourceClass: new (body) => T) {}

  abstract persist(resource: T): void;
  abstract find(id: string): T;
}
