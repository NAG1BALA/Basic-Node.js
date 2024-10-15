const http = require('http');

let countGeneral = 0;
let countAbout = 0;
const server = http.createServer((req, res) => {

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });

        res.end(`<h1>Корневая страница<h1>\n<p>Просмотров: ${++countGeneral}</p>\n<a href="/about">Ссылка на страницу /about<a/>`);

    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`<h1>Cтраница about<h1>\n<p>Просмотров: ${++countAbout}</p>\n<a href="/">Ссылка на страницу /<a/>`);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Страница не найдена!<h1>');
    }
});

const port = 3000;

server.listen(port);
