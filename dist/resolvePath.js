import { resolve } from "path";
import { existsSync } from "fs";
const extensions = [".js", ".jsx", ".ts", ".tsx", ".cjs", ".mjs", ".mdx", ".d.ts", ".json", "/index.js", "/index.jsx", "/index.ts", "/index.tsx", "/index.cjs", "/index.mjs", "/index.mdx", "/index.d.ts"];
export function convertToAbsolutePath(path, paths, srcDir = ".") {
    if (!paths)
        return path;
    for (const key of Object.keys(paths)) {
        const aliasPaths = paths[key];
        const prefix = key.replace(/\*$/, "");
        if (!path.startsWith(prefix))
            continue;
        const pathRelative = path.substring(prefix.length);
        for (const aliasPath of aliasPaths) {
            const replaced = aliasPath.replace(/\*$/, "");
            const modulePath = resolve(srcDir, `${replaced}/${pathRelative}`);
            if (existsSync(modulePath) || extensions.some((ext) => existsSync(`${modulePath}${ext}`))) {
                return modulePath;
            }
        }
    }
    return path;
}
