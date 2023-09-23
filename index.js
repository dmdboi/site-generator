import { Edge } from "edge.js";
import { writeFileSync } from "fs";

import chokidar from "chokidar";
import { fetchGlobals } from "./fileLoader.js";

const edge = Edge.create();
edge.mount(new URL("./src", import.meta.url));

const outputDir = "./dist";
let globals = {};

const pages = [
  {
    name: "home",
    data: {
      title: "Home",
      content: "Hello, this is the home page",
    },
  },
  {
    name: "about",
    data: {
      title: "About Us",
      content: "Hello, this is the About Page",
    },
  },
];

async function build(page, data) {
  const html = await edge.render(`pages/${page}.edge`, {...data, ...globals});
  writeFileSync(`./${outputDir}/${page}.html`, html);
}

async function getAllPages() {
  await Promise.all(
    pages.map(async page => {
      await build(page.name, page.data);
    })
  );
}

async function main() {
  globals = await fetchGlobals();
  const watch = chokidar.watch("./src", { persistent: true });

  console.log(globals)

  watch
    .on("add", async path => {
      console.log(path);
      await getAllPages();
    })
    .on("change", async path => {
      console.log(path);
      await getAllPages();
    })
    .on("unlink", async path => {
      console.log(path);
      await getAllPages();
    });
}

main();
