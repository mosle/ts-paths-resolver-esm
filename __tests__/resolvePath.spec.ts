import { convertToAbsolutePath } from "../src/resolvePath";
import { resolve, relative } from "path";
import fsExtra from "fs-extra";
import fs from "fs";

const root = resolve(__dirname, "fixtures/.testtemp");
beforeAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root);
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

const touch = (path: string) => {
  const file = `${root}/${path}`;
  fsExtra.outputFileSync(file, "");
};
describe("", () => {
  test("", () => {
    const paths = {
      "@/*": ["./*"],
    };
    touch("assets/file");
    const path = convertToAbsolutePath("@/assets/file", paths, root);
    const relativePath = relative(__dirname, path);
    expect(relativePath).toEqual("fixtures/.testtemp/assets/file");
  });
  test("", () => {
    const paths = {
      "@": ["."],
      "@/*": ["./*"],
    };
    touch("assets/file");
    const path = convertToAbsolutePath("@/assets/file", paths, root);
    const relativePath = relative(__dirname, path);
    expect(relativePath).toEqual("fixtures/.testtemp/assets/file");
  });
  test("", () => {
    const paths = {
      assets: ["assets"],
      "assets/*": ["assets/*"],
    };
    touch("assets/file");
    const path = convertToAbsolutePath("assets/file", paths, root);
    const relativePath = relative(__dirname, path);
    expect(relativePath).toEqual("fixtures/.testtemp/assets/file");
  });
  test("not found", () => {
    const paths = {
      "@": ["."],
      "@/*": ["./*"],
      assets: ["assets"],
      "assets/*": ["assets/*"],
    };
    touch("assets/file");
    const path = convertToAbsolutePath("assets/file2", paths, root);
    expect(path).toEqual("assets/file2");
  });
});
