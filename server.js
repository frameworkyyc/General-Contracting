const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const files = {'/':'index.html','/index.html':'index.html','/style.css':'style.css','/script.js':'script.js'};
  const file = files[pathname];
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  res.setHeader('Content-Type', {'html':'text/html','css':'text/css','js':'text/javascript'}[path.extname(file).slice(1)] + '; charset=utf-8');
  fs.createReadStream(path.join(root, file)).pipe(res);
}).listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('Website running on port ' + (process.env.PORT || 3000)));
