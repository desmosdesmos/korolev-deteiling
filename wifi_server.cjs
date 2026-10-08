const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const PORT = 8080;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.cjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function getWifiIp() {
  const nets = os.networkInterfaces();
  let wifiIp = null;
  let fallbackIp = null;

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        // Look for typical private subnet (192.168.x.x, 10.x.x.x)
        if (net.address.startsWith('192.168.') || net.address.startsWith('10.')) {
          wifiIp = net.address;
          break;
        } else if (!fallbackIp && !net.address.startsWith('169.254.') && !net.address.startsWith('172.18.')) {
          fallbackIp = net.address;
        }
      }
    }
    if (wifiIp) break;
  }
  return wifiIp || fallbackIp || '127.0.0.1';
}

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, reqPath);

  // Security check
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    return res.end('Access Denied');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Файл не найден (404)');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const totalSize = stats.size;

    // Handle Range Requests (CRITICAL for mobile video streaming on iOS & Android)
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm')) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize) {
        res.writeHead(416, {
          'Content-Range': `bytes */${totalSize}`
        });
        return res.end();
      }

      const chunkSize = (end - start) + 1;
      const stream = fs.createReadStream(filePath, { start, end });

      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': contentType
      });
      stream.pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': totalSize,
        'Content-Type': contentType,
        'Accept-Ranges': 'bytes'
      });
      fs.createReadStream(filePath).pipe(res);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getWifiIp();
  const url = `http://${ip}:${PORT}`;

  // Try generating qrcode.png via python if available
  try {
    execSync(`python -c "import qrcode; qr = qrcode.QRCode(border=1); qr.add_data('${url}'); qr.make(fit=True); qr.make_image(fill_color='black', back_color='white').save('qrcode.png')"`, { stdio: 'ignore' });
  } catch (e) {}

  console.log('================================================================');
  console.log('  ЛОКАЛЬНЫЙ СЕРВЕР «АВТО & МАНИЯ» ЗАПУЩЕН ДЛЯ ТЕЛЕФОНА');
  console.log('================================================================');
  console.log(`\n  1. Подключите телефон к тому же Wi-Fi роутеру, что и этот компьютер.`);
  console.log(`\n  2. Откройте на телефоне браузер (Safari, Chrome) и перейдите по адресу:`);
  console.log(`\n     👉   ${url}   👈\n`);
  console.log(`  3. На компьютере также доступно по адресу: http://localhost:${PORT}`);
  console.log(`  4. QR-код для быстрого сканирования сохранён в файл: qrcode.png`);
  console.log('================================================================');
  console.log('  Сервер работает. Для остановки нажмите Ctrl + C');
  console.log('================================================================\n');
});
