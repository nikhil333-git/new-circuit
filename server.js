require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const users = []; 

app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log({ email, password });
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    users.push({ email, password: hashedPassword });
    res.status(200).send('User registered successfully');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).send({ auth: true });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
