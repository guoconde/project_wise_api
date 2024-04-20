export interface HashGenarator {
  hash(plain: string): Promise<string>;
}
