// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'localstorage-polyfill';

import { enableProdMode } from '@angular/core';
import { renderModuleFactory } from '@angular/platform-server';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// ref: https://blog.khophi.co/localstorage-undefined-angular-server-side-rendering/
global['localStorage'] = localStorage;

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// ref: https://github.com/angular/angular-cli/wiki/stories-universal-rendering
app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
  res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular api use the Universal engine
app.get('*', (req, res) => {
  // update it with providers for 'REQUEST' and 'RESPONSE' for Cookies support
  // ref: https://github.com/salemdar/ngx-cookie
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), {
    req,
    res,
    providers: [
      {provide: 'REQUEST', useValue: (req)},
      {provide: 'RESPONSE', useValue: (res)}
    ]
  });
});
/*app.get('/index.html', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});*/

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
