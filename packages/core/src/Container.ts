export class Container {
  private repos = {};

  addRepository(resourceClass, repo) {
    this.repos[resourceClass] = repo;
  }

  async getRepository(resourceClass) {
    const repo = this.repos[resourceClass] ?? this.repos['default'];

    if (typeof repo === 'string') {
      const { default: repoClass } = await import(repo);
      const instancedRepo = new repoClass(resourceClass);
      this.repos[resourceClass] = instancedRepo;

      return instancedRepo;
    }

    return repo;
  }
}
