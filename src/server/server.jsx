import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from 'react-router-dom/server';
import { App } from '../client/components/App.jsx';
import fs from 'fs';
import path from "path";

const createReactApp = async (location) => {
  
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={location} >
      <App />
    </StaticRouter>
  );

  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf8');

  const reactHtml = html.replace(
    '<div id="root"></div>', `<div id="root">${reactApp}</div>`
  )

  return reactHtml;
}

const app = express();
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

const PORT = process.env.PORT || 3000;

app.get("*", async (req, res) => {
  const indexHtml = await createReactApp(req.url);
  res.status(200).send(indexHtml);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
