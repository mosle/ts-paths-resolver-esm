import { convertToAbsolutePath } from "./resolvePath";
import { loadTsConfig } from "./loadTsConfig";
export function createResolver(tsconfigPath, rootPath) {
    const config = loadTsConfig(tsconfigPath, rootPath);
    if (config)
        return (path) => {
            return convertToAbsolutePath(path, config.options.paths, config.options.baseUrl);
        };
}
