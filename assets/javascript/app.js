// Possible features: Bar display on timer instead of number only, random order to questions and answers,
// select length of game (# of questions), sound effects, gifs 
// Harder difficulty - less time to answer questions

let title, subtitle, startButton, categoryButton, chosenCategory;

let categories = [
   animals = {
    name: 'Animals',
    isCategory: false,
    questions: [
      { 
      question: "Question 1",
      answer: "Answer",
      choices: ["Answer", "Answer2", "Answer3", "Answer4"]
      }
    ]  
  },

  science = {
    name: 'Science',
    isCategory: false,
    questions: ['first q', 'second q', 'third q', 'fourth q', 'fifth q']
  },

  potentPotables = {
    name: 'Potent Potables',
    isCategory: false,
    questions: ['first q', 'second q', 'third q', 'fourth q', 'fifth q']
  },
];

// Create initial page html
initHtml = () => {
  $( 'body' ).html( 
    '<div class="container">' +
      '<div class="jumbotron">' +
        '<h1 class="display-3 text-center" id="title">Welcome to Trivia!</h1>' +
        '<hr class="my-4">' +
        '<h1 class="display-4 text-center" id="subtitle">Press start to begin</h1>' +
        '<div class="row" id="main-content">' +
          '<button type="button" class="btn btn-outline-primary btn-lg" id="btn-start">Start</button>' +
        '</div>' +  
      '</div>' +
    '</div>' );
};


// Run first so we can select elements
initHtml();
// Select elements
title = $( '#title' );
subtitle = $( '#subtitle' );
startButton = $( '#btn-start' );
content = $( '#main-content' );

// Start the game on click
$( startButton ).on( 'click', function() {
  console.log("Game started");
  selectCategoryHtml();
} );


selectCategoryHtml = () => {
  console.log( 'Select a Category' );
  subtitle.text( 'Select a Category' );
  startButton.remove();
  categories.forEach( function( i ) {
    content.append( 
      '<div class="col-lg-4 text-center">' + 
        '<button type="button" class="btn btn-outline-success btn-lg btn-category">' + i.name + '</button>' + 
      '</div>' );
  } );

  categoryButton = $( '.btn-category' )

  $(categoryButton).on( 'click', function() {
    this.isCategory = true;
    categories.forEach( function( i ) {
      if ( i.isCategory === true ) {
        chosenCategory = i;
        console.log(chosenCategory)
      }
    } )
  })
};






//Timer for questions
questionTimer = () => { 
  $("#countdown").countdown360({
    radius      : 60.5,
    seconds     : 30,
    strokeWidth : 15,
    fillStyle   : '#0276FD',
    strokeStyle : '#003F87',
    fontSize    : 50,
    fontColor   : '#FFFFFF',

    autostart: false,
    onComplete  : function () { console.log('completed') }
  }).start()
  
};


// Start button to start the timer / game

// Append title, timer and divs, 

// Show question and start timer

// On guess, pause timer, show image and correct answer if wrong, show correct if correct
// Count down for about 5 seconds and display next question

// At end show correct/incorrect answers and start over button

