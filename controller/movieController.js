const connection = require('../db/connection');


function index (req, res){
    const sql = 'SELECT * FROM movies'
    
    connection.query(sql, (err, result) => {
        
        if(err) return res.status(500).json({
            error: true,
            message: err.message
        })
        
        console.log(result);
        res.json(result);
    })
};



function show (req, res){

    const {id} = req.params;
    const sql = 'SELECT * FROM movies WHERE id=?';

    connection.execute(sql, [id], (err, result) => {

        if(err) return res.status(500).json({
            error: true,
            message: err.message
        })
    
        if (result.length === 0) {
            return res.status(404).json({
                error: true,
                message: 'Not found'
            })
        }
    
        const movie = result[0];
        const sqlReview = 'SELECT * FROM reviews WHERE movie_id = ?'
    
        connection.execute(sqlReview, [id], (err, result) => {
            
            if(err) return res.status(500).json({
                error: true,
                message: err.message
            })

            const movieReviews = result;
            console.log(movieReviews);
            movie.reviews = movieReviews;
            res.json(movie);
        })

        console.log(movie);
    })
    
};



function post (req, res){
    
    console.log('Dati ricevuti:', req.body);
    console.log('ID film:', req.params);
    
    const { id } = req.params;
    const { name, vote, text } = req.body
    const sqlPost = 'INSERT INTO reviews ( movie_id, name, vote, text ) VALUES (?, ?, ?, ?)';

    connection.execute(sqlPost, [id, name, vote, text ], (err, result) => {

        if (err) {
            console.error('Errore database:', err); // Per debug
            return res.status(500).json({
                error: true,
                message: err.message
            });
        }

        return res.status(201).json({
            success: true,
            message: 'Review aggiunta con successo',
            insertId: result.insertId
        });
    })

}


module.exports = {
    index,
    show,
    post
};