require('dotenv').config();
const express = require('express');
const app = express();
const movieRouter = require('./routes/movies');
const connection = require('./db/connection');

const port = process.env.PORT;

// Imposto CORS per permettere chiamata api
const cors = require('cors');
app.use(cors());

// Utilizzo asset statici (foto)
app.use('/images' ,express.static('./public'));

app.use(express.json());

// Utilizzo router
app.use('/api/movies', movieRouter);

app.get('/', (req, res)=>{
    res.send('Welcome to my app')
});

app.get('/:id', (req, res)=>{
    console.log(req.params.id);
});

app.listen(port, ()=>{
    console.log(`Server is listening http://localhost:${port} 🛜`);
})