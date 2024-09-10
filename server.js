import express from 'express';
import cors from 'cors'; 

// const server = express();

// server.get('/',(req,res) => {
//     console.log(req);
//     res.send('Hello World!')
// })

const server = express();

server.use(express.json());
server.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

server.get('/api/about', (req, res) => {
    console.log("Request received and response being sent");
    res.json({ message: 'Request received and response being sent' });
});

server.listen(8080, () => {
    console.log('Server is running on port 8080');
});