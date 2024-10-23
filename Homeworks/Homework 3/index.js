const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();


app.get('/', (req, res) => {
    const pathToFileHome = path.join(__dirname, 'countGeneral.json');
    const countGeneral = JSON.parse(fs.readFileSync(pathToFileHome, 'utf-8'));

    countGeneral.count = countGeneral.count + 1;

    fs.writeFileSync(pathToFileHome, JSON.stringify(countGeneral, null, 2));

    res.send(`<h1>Корневая страница</h1><p>Просмотров: ${countGeneral.count}</p><a href="/about">Ссылка на страницу /about</a>`);
})

app.get('/about', (req, res) => {
    const pathToFileAbout = path.join(__dirname, 'countAbout.json');
    const countAbout = JSON.parse(fs.readFileSync(pathToFileAbout, 'utf-8'));

    countAbout.count = countAbout.count + 1;

    fs.writeFileSync(pathToFileAbout, JSON.stringify(countAbout, null, 2));

    res.send(`<h1>Страница about</h1><p>Просмотров: ${countAbout.count}</p><a href="/">Ссылка на страницу /</a>`);
})

app.listen(3000);