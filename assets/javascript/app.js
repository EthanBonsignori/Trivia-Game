// Possible features: 
// (DONE)Bar display on timer instead of number only, 
// (DONE)Random order to questions and answers,
// Select difficulty of game - how much time on each question
// Sound effects and/or music
// (DONE)Gifs relating to each question when answered 

// Declaring variables
let
// Html elements
title, divider, subtitle, content, tab, gifDiv, questionText, chosenCategory, choice, timerBar,
// Data
shuffledQuestions, questionIndex, questionCounter, questionTime, guess, gifTimeoutId, firstGame,
// Answers
correctAnswers, incorrectAnswers, unanswered, totalCorrectAnswers, totalIncorrectAnswers, totalUnanswered,
// Intervals & Timeouts
questionIntervalId, questionTimerId, smoothInterval, gidTimeoutId, 
// Difficulties (seconds)
difficultyEasy, difficultyMedium, difficultyHard, chosenDifficulty;

totalCorrectAnswers = 0;
totalIncorrectAnswers = 0;
totalUnanswered = 0;
firstGame = true;

// May add chosen difficulty later
difficultyEasy = 30;
difficultyMedium = 20; 
difficultyHard = 10;
chosenDifficulty = difficultyMedium;

let categories = [

   animals = {
    name: 'Animals',
    tabId: 'animals',
    value: 1,
    length: 5,
    difficulty: 'Easy',
    description: 'The animal category contains questions dealing with everything in the animal kingdom!',
    questions: [
      { 
        question: "What is the name for a collective group of lions?",
        answer: "Pride",
        choices: ["Pride", "Flock", "Herd", "Run & Hide"],
        gif: "12Iabt4Yt9hSUM",
      },
      { 
        question: "What type of animal is a Portuguese man o' war?",
        answer: "Jellyfish",
        choices: ["Jellyfish", "Snail", "Dolphin", "It's not an animal"],
        gif: "mlYRUYfJKpINW",
      },
      { 
        question: "What is the natural habitat of arboreal animals?",
        answer: "In the trees",
        choices: ["In the trees", "Under the desert sand", "In the deep ocean", "Your attic"],
        gif: "XBbe8ApwcblsY",
      },
      { 
        question: "What is the largest living bird?",
        answer: "Ostrich",
        choices: ["Ostrich", "Bald Eagle", "Condor", "Pterodactyl"],
        gif: "vFXGVzIlemGu4",
      },
      { 
        question: "This animal is considered the deadliest animal ever, excluding humans.",
        answer: "Mosquito",
        choices: ["Mosquito", "Great-White Shark", "Hippopotamus", "Dog"],
        gif: "l0MYsIQmIVdCG6w4o",
      },
    ],

  },

  science = {
    name: 'Science',
    tabId: 'science',
    value: 2,
    length: 6,
    difficulty: 'Medium',
    description: 'The science category contains questions that are sure to baffle the mind with a wide variety of science related questions ranging from biology to physics!',
    questions: [
      { 
        question: "What is the opposite of matter?",
        answer: "Antimatter",
        choices: ["Antimatter", "Dark Matter", "A Black Hole", "Inverse Matter"],
        gif: "8JMW0KHcdqrq8"
      },
      { 
        question: "People with this blood type are considered 'universal donors'.",
        answer: "O type",
        choices: ["O type", "AB type", "A type", "B type"],
        gif: "xUA7biF7n8LcAqh4bK"
      },
      { 
        question: "When eating a hot pepper, what substance causes the burning sensation?",
        answer: "Capsaicin",
        choices: ["Capsaicin", "Gingerol", "Allyl isothiocyanate", "Vitamin C"],
        gif: "5hoaXceZ1w1CNtd1N3"
      },
      { 
        question: "Which planet in our solar system is closest to the sun?",
        answer: "Mercury",
        choices: ["Mercury", "Earth", "Venus", "Uranus"],
        gif: "l4FGJQvXJdKsBboha"
      },
      { 
        question: "In 1633 the Church condemned him to house arrest for astronomical heresy.",
        answer: "Galileo",
        choices: ["Galileo", "Sir Isaac Newton", "Johann Sebastian Bach", "John Locke"],
        gif: "l2Sqd3jnE4QEyOPM4"
      },
      {
        question: "It's the more common name for sodium chloride.",
        answer: "Salt",
        choices: ["Salt", "Bleach", "Water", "Toothpaste"],
        gif: "QOgvV9rV4hHpgNRBfQ"
      },
    ],
    
  },

  potentPotables = {
    name: 'Potent Potables',
    tabId: 'potent-potables',
    value: 3,
    length: 8,
    difficulty: 'Hard',
    description: 'A trivia category popularized by the long running TV show Jeopardy! and several appearances on the Saturday Night Live\'s skit Celebrity Jeopardy!' +
    ' This category features questions having to do with alcoholic beverages.',
    questions: [
      { 
        question: "More similar to beer than wine in production, this alcohol begins with steamed rice & mold.",
        answer: "Sake",
        choices: ["Sake", "Tequila", "Vodka", "Everclear"],
        gif: "xUPGcsiNHoFdtXWG1q"
      },
      { 
        question: "The brand called Mike's Hard makes cider & punch but its logo shows this: its flagship drink.",
        answer: "Lemonade",
        choices: ["Lemonade", "Juice", "Club Soda", "Water"],
        gif: "Mv3QingEh0SaI"
      },
      { 
        question: "The name of this spirit comes from the Russian word for 'water.'",
        answer: "Vodka",
        choices: ["Vodka", "Rum", "Gin", "Absinthe"],
        gif: "iEBXec8t3zod2"
      },
      { 
        question: "The flowers of this plant give beer its bitter taste.",
        answer: "Hops",
        choices: ["Hops", "Chamomile", "Basil", "Yarrow"],
        gif: "3HwNaSR0VRk2Z6CTgM"
      },
      {
        question: "What is the official distilled spirit of the United States?",
        answer: "Bourbon",
        choices: ["Bourbon", "Rum", "Moonshine", "Tequila"],
        gif: "O9vkkgKfHBDhu"
      },
      {
        question: "This brand has been made at the Lynchburg, Tennessee distillery since 1866.",
        answer: "Jack Daniels",
        choices: ["Jack Daniels", "Jim Beam", "Hennessy", "Maker's Mark"],
        gif: "2w5UtbNhIyP3G"
      },
      {
        question: "Peppermint & root beer are popular flavors of this strong potable, from the German for 'mouthful.'",
        answer: "Schnapps",
        choices: ["Schnapps", "Absolut", "Jagermeister", "Patrón"],
        gif: "9lCrsRjrg9MI0"
      },
      {
        question: "It puts the fizz in a gin fizz.",
        answer: "Club Soda",
        choices: ["Club Soda", "Pineapple Juice", "Coca-Cola", "Alka-Seltzer"],
        gif: "37QGsYyVuSKZdhd2IF"
      },  
    ],
    
  },

];

initVars = () => {
  correctAnswers = 0;
  incorrectAnswers = 0;
  unanswered = 0;
}

// Create initial page html
generateInitialHtml = () => {
  $( 'body' ).append( 
    `<div class="container">
        <div class="jumbotron" id="jumbo">
          <h1 class="display-3 text-center" id="title">Welcome to Topnotch Trivia!</h1>
          <hr class="my-4" id="divider">
          <h2 class="float-left" id="subtitle">Press start to begin</h2><h2 class="float-right" id="question-counter"></h2>
          <div class="clearfix"></div>
          <div id="main-content">
        </div>
      </div>
    </div>`
  );
};

// Run first so we can select elements
generateInitialHtml();


// Select elements from created html
jumbotron = $( '.jumbotron' );
title = $( '#title' );
divider = $( '#divider' )
subtitle = $( '#subtitle' );
content = $( '#main-content' );
questionCounterHtml = $( '#question-counter' )


// Start the game on start button click
$( document ).on( 'click', '#btn-start', function() {
  console.log( 'Game Started' )
  selectCategoryHtml();
  this.remove();
} );

// Show categories
selectCategoryHtml = () => {
  if ( firstGame ) {
    // Animate hide and replace of title text
    title.fadeOut( 250, function() {
      title.text( 'Topnotch Trivia' ).fadeIn( 1000 );
    } );
  }
  firstGame = false;
  // Animate hide and replace of subtitle text
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
      `<button type="button" class="list-group-item btn-category tablinks" value="${ i.value }"   
      id="cat-btn-${i.value}"
      onmouseover="openCategory( event, '${ i.tabId }' )" 
      onclick="questionTimer()">
      ${ i.name }</button></div>`
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
    chosenValue = this.value;
    content.append( `<h4 id="question"></h4>` );
    questionText = $( '#question' );
    for ( let i = 0; i < categories.length; i++ ) {
      if ( categories[i].value == chosenValue ) {
        chosenCategory = categories[i];
        startGame( chosenCategory );
      };
    };
  } );

};

startGame = ( category ) => {
  initVars();
  questionCounter = 0;
  questionCounterHtml.text( `Question ${questionCounter + 1}` ).hide();
  // Switch subtitle to category name and display question counter
  subtitle.fadeOut( 0, function() {
    subtitle.text( category.name ).fadeIn( 300 );
    questionCounterHtml.fadeIn( 300 );
      } );
  // Remove all select categories html
  removeCategories();
  // Randomize order of questions
  shuffledQuestions = shuffle( [...category.questions] );
               
  displayQuestion( shuffledQuestions );    
}

// Find index of current question and display to screen
displayQuestion = ( qs ) => {
  questionCounterHtml.text( `Question ${questionCounter + 1}` ) 
  questionIndex = questionCounter;
  questionText.text( qs[questionIndex].question );
  questionCounter++; // Increment question counter so a new question is displayed on every call
  getChoices( qs );
}

// Generates html to display each possible answer in a list
getChoices = ( q ) => {
  generateChoiceHtml( q );
  choice = $( '.choice' )
  choice.on( 'click', function() {
    guess = $( this ).text().substring( 3 );
    if ( guess === q[questionIndex].answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
    $( '.list-group' ).remove();
    showGif();
    clearInterval( questionIntervalId );
    clearTimeout( questionTimerId );
    clearInterval( smoothInterval );
  } );
};

questionTimer = () => {
  questionTime = chosenDifficulty * 1000;
  seconds = chosenDifficulty;
  questionIntervalId = setInterval( updateTimerBar, 1000 );
  questionTimerId = setTimeout( function() {
    timeUp() 
  }, questionTime )
 startTimerBarSmooth();
}

generateChoiceHtml = ( q ) => {
  // Randomize order of choices and store in array 
  let choiceOrder = shuffle( [...q[questionIndex].choices] );
  // Create element to append our choices
  content.append( `<div class="list-group"></div>` );
  // Loop to create each choice element, every question has 4 choices so this will work on every question
  for ( let i = 0; i < 4; i++ ) {
    let listNum = i + 1
    $( '.list-group' ).append(
      `<button type="button" class="list-group-item list-group-item-action choice">${listNum}. ${choiceOrder[i]}</button>`
    );
  };
  // Create element to display our timer
  generateTimerBar()
 }

generateTimerBar = () => {
  $( '.list-group' ).append( 
    `<div class="progress">
    <div class="progress-bar" id="timer-bar" role="progressbar" style="width: 100%">
      <p id="time-remaining">${questionTime / 1000} seconds</p>
    </div>
  </div>` )
};

// Run on correct player guess
correctAnswer = () => {
  correctAnswers++;
  console.log( `Correct answer. Total: ${correctAnswers}` )
  questionText.html( `Correct!` )
}

// Run on incorrect player guess
incorrectAnswer = () => {
  incorrectAnswers++;
  questionText.html( `Incorrect! The correct answer was: <b>${shuffledQuestions[questionIndex].answer}</b>` )
  console.log( `Incorrect answer. Total: ${incorrectAnswers}`)
}

// Run when question timer runs out
timeUp = () => {
  clearInterval(questionIntervalId);
  clearTimeout(questionTimerId);
  clearInterval(smoothInterval);
  showGif();
  unanswered++;
  console.log("Time's up")
  $( '.list-group' ).remove();
  questionText.html( `You ran out of time! The correct answer was: <b>${shuffledQuestions[questionIndex].answer}</b>` )
}

showGif = () => {
  content.append( `<div id="gif"><iframe src="https://giphy.com/embed/${shuffledQuestions[questionIndex].gif}" width="480" height="480" frameBorder="0" class="giphy-embed"></iframe></div>` );
  gifDiv = $( '#gif' );
  clearTimeout( gifTimeoutId )
  setGifTimeout();
}

setGifTimeout = () => {
  gifTimeoutId = setTimeout( function() {
    if ( shuffledQuestions.length - 1 === questionIndex ) {
      endRound();
    } else {
      displayQuestion( shuffledQuestions );
      questionTimer();
    }
    gifDiv.remove();
  }, 6000 );
};



// Randomize the order of input array so questions/choices appear in a different order on each game
// Fisher-Yates Shuffle
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

// Declare and set variables needed for the updateTimerBar function
let barWidth = 100; // Bar starts at 100%
let seconds = chosenDifficulty; // Same value, different name (so it makes more sense in context)
let fullPercent = ( barWidth / seconds ); // Get full number to subtract bar width by each interval
let smoothPercent = ( ( fullPercent / 100 ) * 17 ); // Get 17% of that number so we can run it 17 times to smooth it out
let subtractWidth = ( Math.floor( smoothPercent * 100 ) / 100 );  // Remove the unesecary decimal places so we have a clean number
// Update a bootstrap timerbar so that it's width equals the percentage of time remaining every second
updateTimerBar = () => {
  timerBar = $( '#timer-bar' );

  // Update text of timer bar
  remainingTime = seconds-- -1;
  let remainingTimeSelector = $( '#time-remaining' );
  if ( remainingTime > 1 ) {
    remainingTimeSelector.text( `${remainingTime} seconds` );
  } else {
    remainingTimeSelector.text( `${remainingTime} second` );
  };

  // Animate bar color
  if ( remainingTime === 8 ) {
    timerBar.addClass( 'yellow' )
  } else if ( remainingTime === 3 ) {
    timerBar.addClass( 'red' )
  };
};

startTimerBarSmooth = () => { 
  smoothInterval = setInterval( smoothSubtract, 50 )
  w = 100;
}

let w = 100;
smoothSubtract = () => {
  timerBar = $( '#timer-bar' );
  w -= 0.25;
  timerBar.css( 'width', `${w}%` )
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

// Remove all select categories html
removeCategories = () => {
  tab.remove();
  $( '.tabcontent' ).remove();
}

endRound = () => {
  questionCounterHtml.animate( { 
    opacity: 0
  }, 1000 );
  
  jumbotron.animate( {
    height: '15vh'
  }, 3000, () => {
    delayTwo = setTimeout( function() {
      appendStats();
      jumbotron.animate( {
        height: '50vh'
      }, 3000 );
    }, 2000 );
  } );

  subtitle.fadeOut( 0, function() {
    subtitle.text( 'Let\'s see how you did...' ).fadeIn( 2000 );
    questionText.text( '' );
  } );
};

appendStats = () => {
  totalCorrectAnswers += correctAnswers;
  totalIncorrectAnswers += incorrectAnswers;
  totalUnanswered += unanswered;
  content.append( `
    <div class="float-left" id="stats-round">
      <h1><u>This Round</u></h1>
      <h4>Correct: <b>${correctAnswers}</b></h4>
      <h4>Inorrect: <b>${incorrectAnswers}</b></h4>
      <h4>Unanswered: <b>${unanswered}</b></h4>
    </div>
    <div class="float-right" id="stats-overall">
      <h1><u>Overall</u></h1>
      <h4>Correct: <b>${totalCorrectAnswers}</b></h4>
      <h4>Inorrect: <b>${totalIncorrectAnswers}</b></h4>
      <h4>Unanswered: <b>${totalUnanswered}</b></h4>
    </div>
    <div class="clearfix"></div>
  ` ).hide().fadeIn( 1000 ) 
  clearTimeout( delayTwo );
};

// Some fun animations
jumbotronAnimate = () => {
  title.fadeIn( 500 );
  jumbotron.animate( {
    backgroundColor: "#e9ecef",
  }, 3000, () => {
    divider.fadeIn( 2000 );
    jumbotron.animate( {
      height: '50vh'
    }, 2000, () => {
    content.append( 
      `<button type="button" class="btn btn-outline-primary btn-lg" id="btn-start">Start</button>` )
      .hide()
      .fadeIn( 1000 );
      subtitle.fadeIn( 1000 )
    } );
  } );

  title.animate( {
    color: "#000"
  }, 3000 );


}

jumbotronAnimate();

