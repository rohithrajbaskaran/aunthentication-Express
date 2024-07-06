import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var dictForPasswords = {};

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/logIn.html', (req, res) => {
    res.sendFile(__dirname + "/logIn.html");
});

function handleSignUp(req, res) {
    dictForPasswords[req.body.email] = req.body.password;
    res.sendFile(__dirname + "/index.html");
}

function handleLogIn(req, res) {
    let emailTemp = req.body.email;
    
    if (dictForPasswords[emailTemp] == req.body.password) {
        res.send("Hello Rohith");
    } else {
        res.send("Login failed. Incorrect email or password.");
    }
}

app.post('/index.html', handleSignUp);

app.post('/logIn.html', handleLogIn);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
