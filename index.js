import { Edge } from "edge.js";

import { writeFileSync } from "fs";

const edge = Edge.create();
edge.mount(new URL("./src", import.meta.url));

const outputDir = "./dist";

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

async function render(page, data) {
  const html = await edge.render(`pages/${page}.edge`, data);
  writeFileSync(`./${outputDir}/${page}.html`, html);
}

async function main() {
  await Promise.all(
    pages.map(async page => {
      await render(page.name, page.data);
    })
  );
  console.log('Rendered all pages')
}

main();
