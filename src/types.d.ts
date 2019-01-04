declare module "hosted-git-info" {
  interface Options {
    noCommittish?: true;
    noGitPlus?: true;
  }

  export function fromUrl(url: string, options?: Options): any;
}

type BigInt = number;
declare const BigInt: typeof Number;