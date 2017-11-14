/**
 * es6 modules and imports
 */
"use strict";
/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');

//----------------------------------------------------


// creating the html for each individual movie in the array
const movieHTMLbuilder = (movie) => {
  let html = `<div class="col-xs-12" > <div class="row"><h4 class="col-xs-4">`;
    html += `${movie.title}`;
    html += `</h4><h4 class="col-xs-4">`;
    html += `Rating: ${movie.rating}`;
    html += `</h4>`;
    html += `<div class="col-xs-4"><button class="btn btn-info" type="button" id="editBtn${movie.id}">Edit</button><button class="btn btn-danger" type="button" id="deleteBtn${movie.id}">DELETE</button></div>`;
    html += `<div class="col-xs-12" id="editInputs${movie.id}"></div></div></div>`;
    return html;
};

// starts the html build for the whole movie array
const movieArrayHTML = (arrayOfMovies) => {
  let movieListHTML = ``;
  arrayOfMovies.forEach((element) => {
    movieListHTML += movieHTMLbuilder(element);
  });
  return movieListHTML;
};

//-----------------------------------------------------
// New Movie Adding functions

// adding event listener to new movie button
const newMovieAdder = () => {
    const submitButton = $(`#submitBtn`);
    const movieField = $(`#movieTitleInput`);
    const ratingField = $(`#movieRatingInput`);
    submitButton.click(() => {
        let newTitle = movieField.val();
        let newRating = ratingField.val();
        uploadNewMovie(newTitle, newRating);
        movieField.val("");
        ratingField.val("");
    });
};

// function to submit new movie to API server
const uploadNewMovie = (title, rating) => {

  const newMovie = {title: title, rating: rating};
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


// function to submit PUT request to api server to edit existing movies
const editNewMovie = (title, rating, id) => {
    const upDatedMovie = {title: title, rating: rating};
    const url = `./api/movies/${id}`;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(upDatedMovie)
    };
    fetch(url, options)
        .then(() => {
        console.log(`new edit function is firing`);
        fetchingMovieList();
        })
        .catch(() => { console.log('the upload failed')});
};

// This adds listeners to "Toggle Edit" buttons and generates new text fields to add movie changes with
 const addToggleBtn = (movies) =>{
     movies.forEach((element) => {
         $(`#editBtn${element.id}`).click(() => {
             let editTextHTML = `<div class="row">`;
             editTextHTML += `<div class="row"><div class="col-xs-4">`;
             editTextHTML += `<input type="text" value="${element.title}" id="movieTitle${element.id}">`;
             editTextHTML += `</div><div class="col-xs-4">`;
             editTextHTML += `<input type="number" value="${element.rating}" id="movieRating${element.id}">`;
             editTextHTML += `</div><div class="col=xs-4">`;
             editTextHTML += `<button type="button" id="submitEdit${element.id}">Submit Edit</button>`;
             editTextHTML += `<div></div></div>`;
             $(`#editInputs${element.id}`).html(editTextHTML);
             $(`#submitEdit${element.id}`).click(() => {
                 console.log("submit edit button is activating");
                 let newTitle = $(`#movieTitle${element.id}`).val();
                 let newRating = $(`#movieRating${element.id}`).val();
                 editNewMovie(newTitle, newRating, element.id);
             })
         });
     });
 };

// --------------------------------------------------
// this will delete a movie with a confirm prompt
const deleteMovies = (movies) =>{
    //rewriting body
    movies.forEach((element) => {
        $(`#deleteBtn${element.id}`).click(() => {
            let url;
            let options;
            if (confirm(`Are you Sure you want to delete ${element.title}?`)) {
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
      $(`#display-movies`).html(movieArrayHTML(movies));
        deleteMovies(movies);
        addToggleBtn(movies);
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    })
};

//----------------------------------------------------

// Here we are calling the functions defined above
fetchingMovieList();
newMovieAdder();
