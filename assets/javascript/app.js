// Possible features: Bar display on timer instead of number only, random order to questions and answers,
// select length of game (# of questions), sound effects, gifs 
// Harder difficulty - less time to answer questions

let title, subtitle, startButton, content, tab, chosenCategory, shuffledQuestions, questionCounter,
correctAnswers, incorrectAnswers, totalCorrectAnswers, totalIncorrectAnswers;

let categories = [

   animals = {
    name: 'Animals',
    tabId: 'animals',
    value: 1,
    length: 4,
    difficulty: 'Easy',
    description: 'The animal category contains questions dealing with everything in the animal kingdom!',
    questions: [
      { 
        question: "What is the name for a collective group of lions?",
        answer: "Pride",
        choices: ["Pride", "Flock", "Herd", "Group"]
      },
      { 
        question: "What type of animal is a Portugeuse man o' war?",
        answer: "Jellyfish",
        choices: ["Jellyfish", "Snail", "Dolphin", "It's not an animal"]
      },
      { 
        question: "What is the natural habitat of arboreal animals?",
        answer: "In the trees",
        choices: ["In the trees", "Under the desert sand", "In the deep ocean", "Your attic"]
      },
      { 
        question: "What is the largest living bird?",
        answer: "Ostrich",
        choices: ["Ostrich", "Bald Eagle", "Condor", "Pterodactyl"]
      },
    ],

  },

  science = {
    name: 'Science',
    tabId: 'science',
    value: 2,
    length: 4,
    difficulty: 'Medium',
    description: 'The science category contains questions that are sure to baffle the mind with a wide variety of science related questions ranging from biology to physics!',
    questions: [
      { 
        question: "What is the opposite of matter?",
        answer: "Antimatter",
        choices: ["Antimatter", "Dark Matter", "A Black Hole", "Inverse Matter"]
      },
      { 
        question: "People with which blood type are considered 'universal donors'?",
        answer: "O type",
        choices: ["O type", "AB type", "A type", "B type"]
      },
      { 
        question: "When eating a hot pepper, what substance causes the burning sensation?",
        answer: "Capsaicin",
        choices: ["Capsaicin", "Gingerol", "Allyl isothiocyanate", "Vitamin C"]
      },
      { 
        question: "Which planet in our solar system is closest to the sun?",
        answer: "Mercury",
        choices: ["Mercury", "Earth", "Venus", "Uranus"]
      },
    ],
    
  },

  potentPotables = {
    name: 'Potent Potables',
    tabId: 'potent-potables',
    value: 3,
    length: 4,
    difficulty: 'Hard',
    description: 'A trivia category popularized by the long running TV show Jeopardy! and several appearances on the Saturday Night Live\'s skit Celebrity Jeopardy!' +
    ' This category features questions having to do with alcoholic beverages.',
    questions: [
      { 
        question: "More similar to beer than wine in production, this alcohol begins with steamed rice & mold.",
        answer: "Sake",
        choices: ["Sake", "Tequila", "Vodka", "Everclear"]
      },
      { 
        question: "The brand called Mike's Hard makes cider & punch but its logo shows this: its flagship drink.",
        answer: "Lemonade",
        choices: ["Lemonade", "Juice", "Club Soda", "Water"]
      },
      { 
        question: "The name of this spirit comes from the Russian word for water",
        answer: "Vodka",
        choices: ["Vodka", "Rum", "Gin", "Absinthe"]
      },
      { 
        question: "The flowers of this plant give beer its bitter taste",
        answer: "Hops",
        choices: ["Hops", "Chamomile", "Basil", "Yarrow"]
      },
    ],
    
  },

];


// Create initial page html
initHtml = () => {
  $( 'body' ).append( 
    `<div class="container">
        <div class="jumbotron">
          <h1 class="display-3 text-center" id="title">Welcome to Topnotch Trivia!</h1>
          <hr class="my-4">
          <h2 class="float-left" id="subtitle">Press start to begin</h2><h2 class="float-right" id="question-counter"></h2>
          <div class="clearfix"></div>
          <div id="main-content">
          <button type="button" class="btn btn-outline-primary btn-lg" id="btn-start">Start</button>
        </div>
      </div>
    </div>`
  );
};


// Run first so we can select elements
initHtml();

// Select elements from created html
jumbotron = $( '.jumbotron' );
title = $( '#title' );
subtitle = $( '#subtitle' );
content = $( '#main-content' );
startButton = $( '#btn-start' );
questionCounterHtml = $( '#question-counter' )

// Start the game on start button click
$( startButton ).on( 'click', function() {
  console.log( 'Game Started' )
  selectCategoryHtml();
} );

// Show categories
selectCategoryHtml = () => {
  startButton.remove();
  // Animate hide and replace of text
  title.fadeOut( 250, function() {
    title.text( 'Topnotch Trivia' ).fadeIn( 1000 );
  } );
  subtitle.fadeOut( 200, function() {
    subtitle.text( 'Select a Category' ).fadeIn( 200 );
  } );
  // Add a tab for our category buttons
  jumbotron.append( '<div class="tab"></div>' )
  tab = $( '.tab' )
  
  // Loop for each category, adding a button for each then corresponding tab content"
  categories.forEach( function( i ) {
    // Create buttons
    tab.append( 
      `<button type="button" class="btn btn-outline-primary btn-lg btn-category tablinks" value="${ i.value }"  
      id="cat-btn-${i.value} "onmouseover="openCategory(event, '${ i.tabId }')">${ i.name }</button></div>`
    )
    // Create tab content to show on hover
    jumbotron.append(
      `<div id="${ i.tabId }" class="tabcontent">
      <h4><u><b>${ i.name }</b></u></h4>
      <h5><b>Difficulty: </b>${ i.difficulty }</h5> 
      <h5><b>Questions: </b>${ i.length }</h5> 
      <h5><b>Description: </b>${ i.description }</h5>
      </div>`
    )
  } );

  // Get player's chosen category
  $( '.btn-category' ).on( 'click', function() {
    chosenCategory = this.value;
    for ( let i = 0; i < categories.length; i++ ) {
      if ( categories[i].value == chosenCategory ) {
        startGame( categories[i] );
      };
    };
  } );

};

startGame = ( cat ) => {
  questionCounter = 1;
  // Switch subtitle to category name and display question counter
  subtitle.fadeOut( 200, function() {
    subtitle.text( cat.name ).fadeIn( 200 );
    questionCounterHtml.text( `Question ${questionCounter}` )
  } );
  removeCategories();
  // Randomize order of questions
  shuffledQuestions = shuffle( [...cat.questions] );
  displayQuestion( shuffledQuestions );
  
  // Console log for testing purposes
  testRandom( shuffledQuestions );
}


displayQuestion = ( q ) => {
  content.append( `<h4 id="questions"></h4>` );
  let questions = $( '#questions' );
  questions.text( q[0].question );
}

removeCategories = () => {
  tab.remove();
  $( '.tabcontent' ).remove();
}

// Randomize the order of the questions so the questions appear in a different order on each game
// Fisher-Yates  
shuffle = ( array ) => {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while ( m ) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m-- );

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

testRandom = (x) => {
  console.log( "Shuffled questions array: " + JSON.stringify(x) )
}

// Tabs for categories on mouseover
openCategory = ( event, categoryName ) => {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = $( '.tabcontent' );
  for ( i = 0; i < tabcontent.length; i++ ) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = $( '.tablinks' );
  for ( i = 0; i < tablinks.length; i++ ) {
    tablinks[i].className = tablinks[i].className.replace( ' active', '' );
  }

  // Show the current tab, and add an "active" class to the link that opened the tab
  document.getElementById(categoryName).style.display = "block";
  event.currentTarget.className += " active";
}


// Timer for questions
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

