import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

// SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/ssl/private/selfsigned.key'),
  cert: fs.readFileSync('/etc/ssl/certs/selfsigned.crt')
};

app.use(express.static(join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS server is running on port ${port}`);
});
