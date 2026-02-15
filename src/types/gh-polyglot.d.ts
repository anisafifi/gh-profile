declare module 'gh-polyglot' {
  interface LangData {
    label: string;
    value: number;
    color: string;
  }

  class GhPolyglot {
    constructor(username: string);
    userStats(callback: (err: any, stats: LangData[]) => void): void;
  }

  export = GhPolyglot;
}