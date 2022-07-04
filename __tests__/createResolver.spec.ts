import { createResolver } from "../src/createResolver";
import * as path from "path";

describe("", () => {
  test("", () => {
    const resolver = createResolver("tsconfig.extend.json", path.resolve(__dirname, "fixtures"));
    expect(resolver).not.toBe(undefined);
  });
  test("", () => {
    const resolve = createResolver("tsconfig.extend.json", path.resolve(__dirname, "fixtures"))!;
    const p = resolve("@/dummy");

    const relative = path.relative(__dirname, p);
    expect(relative).toEqual("fixtures/dummy");
  });
});
