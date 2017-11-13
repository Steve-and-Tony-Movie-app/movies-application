/**
 * es6 modules and imports
 */

/**
 * require style imports
 */
const {getMovies} = require('./api.js');
const $ = require('jquery');


// creating the html for each individual movie in the array
const movieHTMLbuilder = (movie) => {
  let html = `<h4 class="col-xs-6">`;
    html += `${movie.title}`;
    html += `</h4><h4 class="col-xs-6">`;
    html += `Rating: ${movie.rating}`;
    html += `</h4>`;
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


// adding eventlistener to new movie button
const newMovieAdder = () => {
    const submitButton = $(`#submitBtn`);
    const movieField = $(`#movieTitleInput`);
    const ratingField = $(`#movieRatingInput`);
    submitButton.click(() => {
        let newTitle = movieField.val();
        let newRating = ratingField.val();
        console.log(newTitle + " " + newRating);
        uploadNewMovie(newTitle, newRating);
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
      .then((response) => {
        console.log('post worked');
        return response.json();
      }).then((data) => {
    console.log(data);
      })
      .catch(() => { alert('the upload failed')});
};

// gets the initial ajax request for movies on page load
getMovies().then((movies) => {
  $(`#display-movies`).html(movieArrayHTML(movies));
  newMovieAdder();
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.');
  console.log(error);
});
