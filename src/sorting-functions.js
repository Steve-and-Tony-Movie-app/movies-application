const $ = require('jquery');
const {movieHTMLbuilder, movieArrayHTML, addToggleBtn} = require('./html-building-functions');
const {deleteMovies} = require('./delete-function');

let sort1 = 0;
let sort2 = 0;
let sort3 = 0;

// sorting the movies by title
const sortByTitle = movies => {
    movies.sort((a,b) => {
        const moviesA = a.title.toUpperCase();
        const moviesB = b.title.toUpperCase();
        if (moviesA < moviesB) {
            return -1
        }
        if (moviesA > moviesB) {
            return 1
        }
        return 0;
    });
    if (sort1 % 2 !== 0) {
        movies.reverse();
    }
    $(`#display-movies`).html(movieArrayHTML(movies));
    deleteMovies(movies);
    addToggleBtn(movies);
    sort1++;
};

const sortByGenre = movies => {
    movies.sort((a,b) => {
        const moviesA = a.genre.toUpperCase();
        const moviesB = b.genre.toUpperCase();
        if (moviesA < moviesB) {
            return -1
        }
        if (moviesA > moviesB) {
            return 1
        }
        return 0;
    });
    if (sort2 % 2 !== 0) {
        movies.reverse();
    }
    $(`#display-movies`).html(movieArrayHTML(movies));
    deleteMovies(movies);
    addToggleBtn(movies);
    sort2++;
};

const sortByRating = movies => {
    movies.sort(function (a, b) {
        return a.rating - b.rating;
    });
    if (sort3 % 2 !== 0) {
        movies.reverse();
    }
    $(`#display-movies`).html(movieArrayHTML(movies));
    deleteMovies(movies);
    addToggleBtn(movies);
    sort3++;
};

const sortingByPropery = (movies) =>
{
    $('#sortTitles').click(() => {
        sortByTitle(movies)
    });
    $('#sortGenres').click(() => {
        sortByGenre(movies)
    });
    $('#sortRating').click(() => {
        sortByRating(movies)
    });
};

module.exports = {sortByTitle, sortByGenre, sortByRating, sortingByPropery, sort1, sort2, sort3};