import { resolve } from "path";
import { loadTsConfig } from "../src/loadTsConfig";

describe("", () => {
  test("", () => {
    const config = loadTsConfig(resolve(__dirname, "../tsconfig.json"));
    expect(config).not.toBeUndefined();
  });
  test("", () => {
    const config = loadTsConfig("tsconfig.extend.json", resolve(__dirname, "fixtures/"));
    expect(config?.options?.resolveJsonModule).toBe(true);
  });
  test("", () => {
    const config = loadTsConfig("tsconfig.extend.json", resolve(__dirname, "fixtures/"));
    expect(config?.options?.paths).toHaveProperty("~~");
  });
  test("", () => {
    const config = loadTsConfig("tsconfig.extend.json", resolve(__dirname, "fixtures/"));
    expect(config?.options?.paths).toHaveProperty("assets/*");
  });
  test("", () => {
    expect(() => loadTsConfig("tsconfig.extend.json")).toThrowError();
  });
});
