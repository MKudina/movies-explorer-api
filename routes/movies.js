const router = require('express').Router();
const { deleteMovieValidate } = require('../utils/Validators');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', createMovie);
router.delete('/:movieId', deleteMovieValidate, deleteMovie);

module.exports = router;
