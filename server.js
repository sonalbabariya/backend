import express from 'express';
import cors from 'cors';
import { arr as data } from './database.js'
import fs from 'fs'
import { error } from 'console';


const server = express();

server.use(express.json());
server.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

server.get('/api/getdata', (req, res) => {
    try {
        res.send(data)
    } catch (error) {
        console.log(error.message);
    }
});

server.post('/api/createdata', (req, res) => {
    try {
        const { username, email } = req.body
        const existingUsername = data.find(info => info.username === username);
        const existingEmail = data.find(info => info.email === email);
        if (existingUsername || existingEmail) {
          return  res.send({ error: 'Username or email already exists' })
        }
        data.push({ username, email, id: Date.now() })
        fs.writeFileSync('./database.js', `export const arr =${JSON.stringify(data, null, 2)}`)
        res.send({ message: "data created succ!" })
    } catch (error) {
        console.log(error.message);
    }
});

server.get('/api/getsingledata/:id', (req, res) => {
    try {
        const {id} = req.params
        const singledata = data.find(info => info.id == Number(id))
        if (singledata == undefined) {
           return res.send({ message: "user not found!" })
        }else{
            res.send({user : singledata})
        }   
    } catch (error) {
        console.log(error.message);
    }
});

server.delete('/api/deletedata/:id', (req, res) => {
    try {
        const index = data.findIndex(info => info.id == Number(req.params.id))
        if (index !== -1) {
            data.splice(index, 1)
            fs.writeFileSync('./database.js', `export const arr =${JSON.stringify(data, null,2)}`)
            res.send({ message: "data deleted succ!" })
        }else{
            res.send({ message: "user not found!" })
        }
    } catch (error) {
        console.log(error.message);
    }
});

server.put('/api/updatedata/:id', (req, res) => {
    try {
        const index = data.findIndex(info => info.id == Number(req.params.id))
        if (index !== -1) {
            const obj = {username : req.body.username,email : req.body.email, id : Number(req.params.id) }
            data.splice(index, 1,obj)
            fs.writeFileSync('./database.js', `export const arr =${JSON.stringify(data, null,2)}`)
            res.send({ message: "data updated succ!" })
        }else{
            res.send({ message: "user not found!" })
        }
    } catch (error) {
        console.log(error.message);
    }
});
server.listen(8080, () => {
    console.log('Server is running on port 8080');
});