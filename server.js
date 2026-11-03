const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/ball') { res.writeHead(302, { Location: '/ball/' }); return res.end(); }
  const files = {'/':'index.html','/index.html':'index.html','/style.css':'style.css','/script.js':'script.js','/ball/':'ball/index.html','/ball/index.html':'ball/index.html','/ball/style.css':'ball/style.css','/ball/deck.jpg':'ball/deck.jpg','/ball/fence.jpg':'ball/fence.jpg'};
  const file = files[pathname];
  if (!file) { res.writeHead(404); return res.end('Not found'); }
  res.setHeader('Content-Type', {'html':'text/html; charset=utf-8','css':'text/css; charset=utf-8','js':'text/javascript; charset=utf-8','jpg':'image/jpeg'}[path.extname(file).slice(1)]);
  fs.createReadStream(path.join(root, file)).pipe(res);
}).listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('Website running on port ' + (process.env.PORT || 3000)));
