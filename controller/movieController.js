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

    const {id} = req.params
    const sql = 'SELECT * FROM movies WHERE id=?'

    connection.execute(sql, [id], (err, result) => {

        if(err) return res.status(500).json({
            error: true,
            message: err.message
        })
    
        console.log(result);
    
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
        })

        console.log(movie);
        res.json(movie)
    })
    
};


module.exports = {
    index,
    show
};