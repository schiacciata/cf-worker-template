class Path {
    private regExp: RegExp;
    params: Record<string, string> = {};
    slug?: string;
    constructor(regExp?: RegExp) {
      this.regExp = regExp || new RegExp('');
    }

    setUp(path: string) {
        this.slug = path;
        return this;
    }
  
    test(path: string): boolean {
      const match = path.match(this.regExp);
      if (!match) return false;

      this.params = match.groups || {};
      return match[0] === path;
    }
}

export default Path;