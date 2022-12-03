const router = require('express').Router();
const { deleteMovieValidate, createMovieValidate } = require('../utils/Validators');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovieValidate, createMovie);
router.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
