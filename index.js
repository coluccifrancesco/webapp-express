require('dotenv').config();
const express = require('express');
const app = express();
const movieRouter = require('./routes/movies');
const connection = require('./db/connection');

const port = process.env.PORT;

// Utilizzo asset statici (foto)
app.use(express.static('./public'));

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