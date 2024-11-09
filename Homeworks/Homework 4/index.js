const express = require(`express`);
const joi = require('joi');
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid') // Подключаем библиотеку uuid

const userScheme = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    city: joi.string().min(1),
    age: joi.number().min(0).max(150).required()
});

const app = express();

const pathToListUsers = path.join(__dirname, 'users.json');

app.use(express.json())

let uniqueID = 0;

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToListUsers, 'utf-8'));
    res.send({ users })
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToListUsers, 'utf-8'));
    const userId = +req.params.id;

    const user = users.find(user => user.id === userId);
    if (user) {
        res.send({ user })
    } else {
        res.status(404);
        res.send({ user: null, message: 'Пользователь не найден' })
    }
});

app.post('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToListUsers, 'utf-8'));
    // const uniqueID = uuidv4() // Генерация нового уникального id с использованием uuid
    let uniqueID = users.length > 0 ? Math.max(...users.map(u => u.id)) : 0;
    uniqueID += 1;
    users.push({
        id: uniqueID,
        ...req.body
    })
    fs.writeFileSync(pathToListUsers, JSON.stringify(users, null, 2));
    res.send({ id: uniqueID })
});

app.put('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToListUsers, 'utf-8'));
    const result = userScheme.validate(req.body);
    if (result.error) {
        return res.status(404).send({ error: result.error.details })
    }

    const userId = +req.params.id;

    const user = users.find(user => user.id === userId);
    if (user) {
        const { firstName, secondName, city, age } = req.body;
        user.firstName = firstName;
        user.secondName = secondName;
        user.city = city;
        user.age = age;
        fs.writeFileSync(pathToListUsers, JSON.stringify(users, null, 2));
        res.send({ user })
    } else {
        res.status(404);
        res.send({ message: 'Пользователь не найден' })
    }
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(pathToListUsers, 'utf-8'));
    const userId = +req.params.id;

    const user = users.find(user => user.id === userId);
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        fs.writeFileSync(pathToListUsers, JSON.stringify(users, null, 2));

        res.send({ user })
    } else {
        res.status(404);
        res.send({ message: 'Пользователь не найден' })
    }
});

app.listen(3000);