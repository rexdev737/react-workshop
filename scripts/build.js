const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

function writeFile(file, contents) {
  mkdirp.sync(path.dirname(file));
  fs.writeFileSync(file, contents);
}

function renderPage(element) {
  return (
    "<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(element)
  );
}

const e = React.createElement;

function HostPage({ bundle, data, title = "React Training" }) {
  return e(
    "html",
    null,
    e(
      "head",
      null,
      e("meta", { charSet: "utf-8" }),
      e("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }),
      e("title", null, title),
      e("link", { rel: "stylesheet", href: "/shared.css" }),
      data &&
        e("script", {
          dangerouslySetInnerHTML: {
            __html: `window.__DATA__ = ${JSON.stringify(data)}`
          }
        })
    ),
    e(
      "body",
      null,
      e("div", { id: "app" }),
      e("script", { src: "/shared.js" }),
      e("script", { src: `/${bundle}.js` })
    )
  );
}

const publicDir = path.resolve(__dirname, "../public");
const subjectsDir = path.resolve(__dirname, "../subjects");
const subjectDirs = fs
  .readdirSync(subjectsDir)
  .map(file => path.join(subjectsDir, file))
  .filter(file => fs.lstatSync(file).isDirectory());

const subjects = [];

subjectDirs.forEach(dir => {
  const match = path.basename(dir).match(/^(\d\d)-(.+)$/);
  const subject = {
    number: match[1],
    name: match[2].replace(/-/g, " ")
  };

  const base = path.basename(dir);

  ["exercise", "solution", "lecture"].forEach(name => {
    if (fs.existsSync(path.join(dir, `${name}.js`))) {
      console.log(`Building ${base}/${name}.html...`);

      writeFile(
        path.join(publicDir, base, `${name}.html`),
        renderPage(e(HostPage, { bundle: `${base}/${name}` }))
      );

      subject[name] = `/${base}/${name}.html`;
    }
  });

  subjects.push(subject);
});

console.log(`Building index.html...`);

writeFile(
  path.join(publicDir, "index.html"),
  renderPage(e(HostPage, { bundle: "index", data: { subjects } }))
);
