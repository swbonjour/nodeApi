const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

let indexHTML = path.join(__dirname, "../client/index.html");

app.get("/", (req, res) => {
    res.sendFile(indexHTML);
})

const filePath = "./users.json";

app.get("/api/users", async (req, res) => {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    res.send(users);
});

app.get("/api/users/:id", async (req, res) => {
    const data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    const user = null;
    for(let i = 0; i < users.length; i++) {
        if(users[i].id == id) {
            user = users[i];
            break;
        }
    }

    if(user) {
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.post("/api/users", async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    let user = {id: null, name: userName, age: userAge}

    let data = await fs.readFile(filePath, "utf-8");
    let users = JSON.parse(data);

    const id = Math.max.apply(Math, users.map(u => u.id))
    user.id = id + 1;

    users.push(user);
    data = JSON.stringify(users);

    await fs.writeFile("users.json", data);
    res.send(user);
});

app.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    let data = await fs.readFile(filePath, "utf-8");
    let users = JSON.parse(data);
    let user = null;
    let index = null;

    for(let i = 0; i < users.length; i++) {
        if(users[i].id == id) {
            index = i;
            user = users[i];
            break;
        }
    }

    if(user) {
        users.splice(index, 1);
        data = JSON.stringify(users);
        await fs.writeFile(filePath, data);
        res.send(user);
    } else {
        res.status(404).send();
    }
});

app.put("/api/users", async (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const userId = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;

    let data = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(data);
    let user = null;
    for(let i = 0; i < users.length; i++) {
        if(users[i].id == userId) {
            user = users[i];
            break;
        }
    }

    if(user) {
        user.name = userName;
        user.age = userAge;
        data = JSON.stringify(users);
        await fs.writeFile(filePath, data);
        res.send(user);
    } else {
        res.status(404).send(user);
    }
})

app.listen(3000, () => {
    console.log("Server is listening on 3000");
})