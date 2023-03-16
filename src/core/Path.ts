class Path {
    private regExp: RegExp;
    params: Record<string, string> = {};
  
    constructor(regExp?: RegExp) {
      this.regExp = regExp || new RegExp('');
    }

    setUp(path: string) {
        this.regExp = new RegExp(path);
        return this;
    }
  
    test(req: Request): boolean {
      const url = new URL(req.url);
      const path = url.pathname;

      const match = path.match(this.regExp);
      if (!match) return false;

      this.params = match.groups || {};
      return match[0] === path;
    }
}

export default Path;