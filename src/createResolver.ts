import { convertToAbsolutePath } from "./resolvePath";
import { loadTsConfig } from "./loadTsConfig";
export function createResolver(tsconfigPath: string, rootPath: string): ((path: string) => ReturnType<typeof convertToAbsolutePath>) | undefined {
  const config = loadTsConfig(tsconfigPath, rootPath);
  if (config)
    return (path: string) => {
      return convertToAbsolutePath(path, config.options.paths, config.options.baseUrl);
    };
}
