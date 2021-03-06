'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var fs = require('fs');
var typescript = require('typescript');

const extensions = [".js", ".jsx", ".ts", ".tsx", ".cjs", ".mjs", ".mdx", ".d.ts", ".json", "/index.js", "/index.jsx", "/index.ts", "/index.tsx", "/index.cjs", "/index.mjs", "/index.mdx", "/index.d.ts"];
function convertToAbsolutePath(path$1, paths, srcDir = ".") {
    if (!paths)
        return path$1;
    for (const key of Object.keys(paths)) {
        const aliasPaths = paths[key];
        const prefix = key.replace(/\*$/, "");
        if (!path$1.startsWith(prefix))
            continue;
        const pathRelative = path$1.substring(prefix.length);
        for (const aliasPath of aliasPaths) {
            const replaced = aliasPath.replace(/\*$/, "");
            const modulePath = path.resolve(srcDir, `${replaced}/${pathRelative}`);
            if (fs.existsSync(modulePath) || extensions.some((ext) => fs.existsSync(`${modulePath}${ext}`))) {
                return modulePath;
            }
        }
    }
    return path$1;
}

function loadTsConfig(path, rootPath = process.cwd()) {
    const configFileName = typescript.findConfigFile(rootPath, typescript.sys.fileExists, path);
    if (!configFileName)
        throw new Error(`${path} is not found`);
    const configFile = typescript.readConfigFile(configFileName, typescript.sys.readFile);
    if (configFile.error) {
        const message = typeof configFile.error.messageText === "string" ? configFile.error.messageText : configFile.error.messageText.messageText;
        throw new Error(message);
    }
    const options = typescript.parseJsonConfigFileContent(configFile.config, typescript.sys, rootPath);
    if (options.errors.length > 0) {
        const message = typeof options.errors[0].messageText === "string" ? options.errors[0].messageText : options.errors[0].messageText.messageText;
        throw new Error(message);
    }
    return options;
}

function createResolver(tsconfigPath, rootPath) {
    const config = loadTsConfig(tsconfigPath, rootPath);
    if (config)
        return (path) => {
            return convertToAbsolutePath(path, config.options.paths, config.options.baseUrl);
        };
}

exports.createResolver = createResolver;
