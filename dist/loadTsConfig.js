import { findConfigFile, parseJsonConfigFileContent, readConfigFile, sys } from "typescript";
export function loadTsConfig(path, rootPath = process.cwd()) {
    const configFileName = findConfigFile(rootPath, sys.fileExists, path);
    if (!configFileName)
        throw new Error(`${path} is not found`);
    const configFile = readConfigFile(configFileName, sys.readFile);
    if (configFile.error) {
        const message = typeof configFile.error.messageText === "string" ? configFile.error.messageText : configFile.error.messageText.messageText;
        throw new Error(message);
    }
    const options = parseJsonConfigFileContent(configFile.config, sys, rootPath);
    if (options.errors.length > 0) {
        const message = typeof options.errors[0].messageText === "string" ? options.errors[0].messageText : options.errors[0].messageText.messageText;
        throw new Error(message);
    }
    return options;
}
