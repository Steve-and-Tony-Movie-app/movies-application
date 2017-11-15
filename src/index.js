/**
 * es6 modules and imports
 */
"use strict";
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');
const {movieHTMLbuilder, movieArrayHTML, editNewMovie, addToggleBtn} = require('./html-building-functions');
const {sortByTitle, sortByGenre, sortByRating, sortingByPropery, sort1, sort2, sort3} = require('./sorting-functions');


//-----------------------------------------------------
// New Movie Adding functions

// adding event listener to new movie button
const newMovieAdder = () => {
    const submitButton = $(`#submitBtn`);
    const movieField = $(`#movieTitleInput`);
    const movieGenre = $(`#movieGenre`);
    const ratingField = $(`#movieRatingInput`);
    submitButton.click(() => {
        let newTitle = movieField.val();
        let newGenre = movieGenre.val();
        let newRating = ratingField.val();
        uploadNewMovie(newTitle, newGenre, newRating);
        movieField.val("");
        ratingField.val("");
    });
};

// function to submit new movie to API server
const uploadNewMovie = (title, genre, rating) => {

  const newMovie = {title: title, genre: genre, rating: rating};
  const url = './api/movies';
  const options = {
    method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie)
  };
  fetch(url, options)
      .then(() => {
      fetchingMovieList();

      })
      .catch(() => { alert('the upload failed')});
};

//------------------------------------------------------
//Edit Movie Functions




// --------------------------------------------------
// this will delete a movie with a confirm prompt
const deleteMovies = (movies) =>{
    //rewriting body
    movies.forEach((element) => {
        $(`#deleteBtn${element.id}`).click(() => {
            let url;
            let options;
            if (confirm(`Are you Sure you want to delete:  ${element.title}?`)) {
                url = `./api/movies/${element.id}`;
                options = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(url, options)
                    .then(() => {
                        console.log(`new edit function is firing`);
                        fetchingMovieList();
                    })
                    .catch(() => {
                        console.log('the upload failed')
                    });
            }});
    });
};


//----------------------------------------------------
// This gets updated list of movies from the server and displays them on the screen
const fetchingMovieList = () => {
    $(`#display-movies`).html(`<div class="col-xs-12"><div class="loader"></div></div>`);
    getMovies().then((movies) => {
        sortingByPropery(movies);
      $(`#display-movies`).html(movieArrayHTML(movies));
        deleteMovies(movies);
        addToggleBtn(movies);
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    })
};
//-----------------------------------------------------

//adding title, genre, and rating sort click options





//----------------------------------------------------

// Here we are calling the functions defined above
fetchingMovieList();
newMovieAdder();
