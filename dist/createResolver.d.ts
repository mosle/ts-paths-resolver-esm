import { convertToAbsolutePath } from "./resolvePath";
export declare function createResolver(tsconfigPath: string, rootPath: string): ((path: string) => ReturnType<typeof convertToAbsolutePath>) | undefined;
