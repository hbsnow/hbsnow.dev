const fs = require("fs");
const path = require("path");

const BASE_URL = "https://hbsnow.dev";
const OUTPUT_DIR = "/out";

const readPathList = async (target, base) => {
  try {
    const posts = await fs.promises.readdir(target, {
      withFileTypes: true,
    });

    return posts.map((dirent) => `${base}/${dirent.name}/`);
  } catch (err) {
    Promise.reject(err);
  }
};

const generateUrlElem = ({ loc }) => {
  return `<url><loc>${loc}</loc></url>`;
};

const generateSitemap = (children) => {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${children}</urlset>`;
};

(async () => {
  const outputDir = path.join(__dirname, OUTPUT_DIR);

  const urlset = [
    "/",
    "/blog/",
    "/book/",
    ...(await readPathList(path.join(outputDir, "/blog"), "/blog")),
    ...(await readPathList(path.join(outputDir, "/blog/tag"), "/blog/tag")),
  ];
  const sitemap = generateSitemap(
    urlset
      .map((urlItem) => {
        const loc = new URL(urlItem, BASE_URL).toString();
        return generateUrlElem({ loc });
      })
      .join("")
  );

  try {
    await fs.promises.writeFile("./out/sitemap.xml", sitemap);

    console.log("success generate sitemap");
  } catch (err) {
    console.error(err);
  }
})();
