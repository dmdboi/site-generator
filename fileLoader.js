import { readdir } from "fs/promises";
import { join, basename } from "path";

const dataDir = "./src/data";

export async function fetchGlobals() {
  let data = {};
  const files = await readdir(dataDir);

  await Promise.all(
    files.map(async file => {
      if (!file.endsWith(".js")) {
        return;
      }

      const moduleName = basename(file, ".js");
      const modulePath = join(dataDir, file);
      const module = (await import(new URL(modulePath, import.meta.url))).default;

      if (typeof module === "object") {
        data[moduleName.replace(".js", "")] = module;
      }

      if(typeof module === "function") {
        data[moduleName.replace(".js", "")] = await module();
      }

    })
  );

  return data;
}
