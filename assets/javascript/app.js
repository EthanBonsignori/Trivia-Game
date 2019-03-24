// Possible features: 
// (DONE)Bar display on timer instead of number only, 
// (DONE)Random order to questions and answers,
// Select difficulty of game - how much time on each question
// Sound effects and/or music
// (DONE)Gifs relating to each question when answered 

// Declaring variables
let
// Html elements
title, divider, subtitle, content, startButton, restartButton, tab, categoryButtonSelector, gifDiv, gifTimerContainer, gifTimerBar, questionText, chosenCategory, choice, timerBar, optionCog,
// Data
shuffledQuestions, questionIndex, questionCounter, questionTime, guess, firstGame, countdownSeconds, totalRounds, playerIsInsane, gifTime, gifOption, gifOptionStatus, gifTimeDivId, scoreTextIndex, jumboFadeColor, titleFadeColor,
// Answers
correctAnswers, incorrectAnswers, unanswered, totalCorrectAnswers, totalIncorrectAnswers, totalUnanswered,
// Intervals & Timeouts
countdownIntervalId, questionIntervalId, questionTimerId, smoothInterval, gifTimeoutId, 
// Difficulties (seconds)
difficultyEasy, difficultyMedium, difficultyHard, chosenDifficulty;

totalCorrectAnswers = 0;
totalIncorrectAnswers = 0;
totalUnanswered = 0;
totalRounds = 1;
scoreTextIndex = 0;
gifTime = 6;
gifOption = 1000;
gifOptionStatus = true;
firstGame = true;
jumboFadeColor = '#007bff';
titleFadeColor = '#ffffff';

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
    icon: 'fa-paw', 
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
    icon: 'fa-atom',
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
    icon: 'fa-glass-martini-alt',
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
  countdownSeconds = 4;
  questionTime = chosenDifficulty * 1000;
}

// Create initial page html
generateInitialHtml = () => {
  $( 'body' ).append( 
    `<div class="container">
        <div class="jumbotron" id="jumbo">
          <h1 class="display-3 text-center" id="title">Welcome to Topnotch Trivia!</h1>
          <hr class="my-4" id="divider">
          <h2 class="float-left" id="subtitle"></h2><h2 class="float-right" id="question-counter"></h2>
          <div class="clearfix"></div>
          <div id="main-content">
          <div class="container" id="btn-container">
            <button type="button" class="btn btn-primary btn-lg" id="btn-start">Start</button>
          </div>
        </div>
      </div>
    </div>`
  );
};

// Run first so we can select elements
generateInitialHtml();

// Select elements from created html
jumbotron = $( '#jumbo' );
title = $( '#title' );
divider = $( '#divider' )
subtitle = $( '#subtitle' );
content = $( '#main-content' );
startButton = $( '#btn-start' );
questionCounterHtml = $( '#question-counter' );

// Start the game on start button click
$( document ).on( 'click', '#btn-start', () => {
  console.log( '----- Game Started -----' )
  jumbotronAnimate();
  generateCategoryHtml();
  startButton.remove();
} );

// Create the html that displays our category selection, hide it until jumbotron animation is complete
generateCategoryHtml = () => {
  if ( firstGame ) {
    appendModal();
    // Animate hide and replace of title text
    title.fadeOut( 500, () => {
      title.text( 'Topnotch Trivia' ).fadeIn( 3000 );
      title.append(` <button type="button" id="title-icon" data-toggle="modal" data-target="#infoModal"><i class="fas fa-info-circle"></i></button>`)
      jumbotron.append(`
      <button type="button" id="option-cog"
      data-toggle="tooltip" data-placement="top" title="Toggle gif display after question">
        <i id="option-cog-icon" class="fas fa-video"></i>
      </button>`)
      .fadeIn( 2000 )
      optionCog = $( '#option-cog-icon' )
      getTooltips();
    } );
  }
  firstGame = false;
  // Animate hide and replace of subtitle text
  subtitle.fadeOut( 200, () => {
    subtitle.text( 'Select a Category' ).hide();
  } );
  // Add a tab for our category buttons
  jumbotron.append( '<div class="tab"></div>' );
  tab = $( '.tab' ).hide();
  
  // Loop for each category, adding a button for each then corresponding tab content"
  categories.forEach( ( i ) => {
    // Create buttons
    tab.append( 
      `<button type="button" class="list-group-item btn-category tablinks" value="${ i.value }"   
      id="cat-btn-${i.value}"
      onmouseover="openCategory( event, '${ i.tabId }' )">
      <h5>${ i.name }<i class="category-icon fas ${i.icon}"></i></h5>
      </button>`
    )
    categoryButtonSelector = $( '.btn-category' )
    // Create tab content to show on hover
    jumbotron.append(
      `<div id="${ i.tabId }" class="tabcontent">
        <h4><b>${ i.name }</b></h4>
        <h5><b>Difficulty: </b>${ i.difficulty }</h5> 
        <h5><b>Questions: </b>${ i.length }</h5> 
        <h5>${ i.description }</h5>
      </div>`
    )
  } );

  // Get player's chosen category
  categoryButtonSelector.on( 'click', function() {
    chosenValue = this.value;
    getCategory();
    // Switch subtitle to category name and display question counter
    subtitle.fadeOut( 0, () => {
      subtitle.html( `<h4><i id="category-icon-game" class="fas ${chosenCategory.icon}"></i> ${chosenCategory.name}</h4>` ).hide();
    } );
    content.append(`<div id="countdown">Get Ready...</div>`);
    countdownSelector = $( '#countdown' );
    removeCategories();
    countdownIntervalId = setInterval( countdown, 1000 )
  } );

};

getTooltips = () => {
  $('[data-toggle="tooltip"]').tooltip()
}
  
countdownSeconds = 3;
countdown = () => {
  countdownSelector.addClass( 'countdownFont' ) 
  if ( countdownSeconds >= 1 ) {
    countdownSelector.text( countdownSeconds )
  } else if ( countdownSeconds === 0 ) {
    countdownSelector.removeClass( 'countdownFont' )
    countdownSelector.text( "GO!" )
  } else if ( countdownSeconds <= -1 ) {
    countdownSelector.remove();
    startGame( chosenCategory );
    questionTimer();
    clearInterval( countdownIntervalId );
  }
  countdownSeconds--;
}

getCategory = () => {
  for ( let i = 0; i < categories.length; i++ ) {
    if ( categories[i].value == chosenValue ) {
      chosenCategory = categories[i];
    };
  };
  console.log( `Chosen Category ---- ${chosenCategory.name}` )
};

startGame = ( category ) => {
  initVars();
  content.append( `<h4 id="question"></h4>` );
  questionText = $( '#question' );
  questionCounter = 0;
  questionCounterHtml.text( `Question ${questionCounter + 1}` ).hide();
  questionCounterHtml.fadeIn( 300 );
  subtitle.fadeIn( 300 )
  // Remove all select categories html
  removeCategories();
  // Randomize order of questions
  shuffledQuestions = shuffle( [...category.questions] );
  displayQuestion( shuffledQuestions );  
    
}

// Find index of current question and display to screen
displayQuestion = ( q ) => {
  questionCounterHtml.text( `Question ${questionCounter + 1}` ) 
  questionIndex = questionCounter;
  questionText.text( q[questionIndex].question );
  questionCounter++; // Increment question counter so a new question is displayed on every call
  getChoices( q )
}

// Generates html to display each possible answer in a list
getChoices = ( qs ) => {
  generateChoiceHtml( qs );
  choice.on( 'click', function() {
    guess = $( this ).attr('data-value');
    console.log("guess " + guess )
    if ( guess === qs[questionIndex].answer) {
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
  questionTimerId = setTimeout( () => {
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
    $( '.list-group' ).append(`
      <button type="button" 
      class="list-group-item list-group-item-action choice"
      data-value="${choiceOrder[i]}">
      ${listNum}. ${choiceOrder[i]}
      <i class="choice-icon fas fa-arrow-right"></i>
      </button>`
    );
  };
  choice = $( '.choice' )
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
  console.log( `Correct Answer ----- This round: ${correctAnswers}` )
  questionText.html( `<i class="fas fa-check"></i> Correct!` )
}

// Run on incorrect player guess
incorrectAnswer = () => {
  incorrectAnswers++;
  questionText.html( `<i class="fas fa-times"></i> Incorrect! The correct answer was: <b>${shuffledQuestions[questionIndex].answer}</b>` )
  console.log( `Incorrect answer --- This round: ${incorrectAnswers}` )
}

// Run when question timer runs out
timeUp = () => {
  clearInterval(questionIntervalId);
  clearTimeout(questionTimerId);
  clearInterval(smoothInterval);
  showGif();
  unanswered++;
  $( '.list-group' ).remove();
  questionText.html( `<i class="far fa-clock"></i> You ran out of time! The correct answer was: <b>${shuffledQuestions[questionIndex].answer}</b>` )
  console.log( `Ran out of time ---- This round: ${unanswered}` )
}

showGif = () => {
  gifTime = 6;
  gifTimeDivId = gifTime - 1;
  content.append( `<div id="gif"><iframe src="https://giphy.com/embed/${shuffledQuestions[questionIndex].gif}" width="480" height="480" frameBorder="0" class="giphy-embed"></iframe></div>` );
  gifDiv = $( '#gif' );
  clearTimeout( gifTimeoutId )
  setGifTimeout();
  showGifTime();
}

setGifTimeout = () => {
  gifTimeoutId = setTimeout( () => {
    if ( shuffledQuestions.length - 1 === questionIndex ) {
      endRound();
    } else {
      displayQuestion( shuffledQuestions );
      questionTimer();
    }
    gifDiv.remove();
  }, gifTime * gifOption );
};

showGifTime = () => {
  gifDiv.append( `<div id="gif-timer-container"></div>` )
  gifTimerContainer = $( '#gif-timer-container' )
  for ( let n = 0; n < gifTime; n++ ) {
    gifTimerContainer.append( `<div class="gif-timer-bar" id="gif-timer-${n}"><div>` )
  } 
  gifTimerBar = $( '.gif-timer-bar' )
  gifInterval = setInterval( removeLastGifTimeDiv, 925 )
}


removeLastGifTimeDiv = () => {
  let gifTimeDiv = $( `#gif-timer-${gifTimeDivId}` )
  gifTimeDiv.fadeOut( 300, () => {
    gifTimeDiv.remove();
  } );
  gifTimeDivId--;
  if (gifTimeDivId === -1) {
    clearInterval(gifInterval);
  }
  
}

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
// let fullPercent = ( barWidth / seconds ); // Get full number to subtract bar width by each interval
// let smoothPercent = ( ( fullPercent / 100 ) * 17 ); // Get 17% of that number so we can run it 17 times to smooth it out
// let subtractWidth = ( Math.floor( smoothPercent * 100 ) / 100 );  // Remove the unesecary decimal places so we have a clean number

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
  subtitle.text( 'Round Over!' ).fadeIn( 300 );
  questionText.text( '' );

  questionCounterHtml.animate( { 
    opacity: 0
  }, 1000 );
  
  jumbotron.animate( {
    height: '25vh'
  }, 2000, () => {
    setTimeout( () => {
      appendStats();
      jumbotron.animate( {
        height: '65vh'
      }, 2000 );
    }, 1500 );
  } );


  setTimeout( () => {
    if ( scoreTextIndex === scoreTextLength - 1 ) {
      playerIsInsane = true;
      console.log( "Is this player insane?!?" + playerIsInsane)
      jumboFadeColor = "#ff0000"
      titleFadeColor = "#8c00ff"
      title.fadeOut( 10000, () => {
        title.text("Bottomnotch Trivia").fadeIn( 1000 );
      } );
    };
    if ( playerIsInsane ) {
      let insaneTextForInsanePlayer = Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 );
      scoreText.push( insaneTextForInsanePlayer );
    }
    subtitle.fadeOut( 500, () => {
      subtitle.text( scoreText[scoreTextIndex] ).fadeIn( 2000 );
      scoreTextIndex++;
    } );
  }, 2300 );
  
};

let scoreText = [
  "Let's see how you did...",
  "Great moves! Keep it up!",
  "Wow, you've played a lot of rounds!",
  "Okay, seriously there's not THAT much content in this game.",
  "IT'S TIME TO STOP!",
  "Okay fine, keep playing... See if I care..." ]
let scoreTextLength = scoreText.length;

appendStats = () => {
  totalCorrectAnswers += correctAnswers;
  totalIncorrectAnswers += incorrectAnswers;
  totalUnanswered += unanswered;
  content.append( `
    <div class="float-left" id="stats-round">
      <h1 class="display-4">This Round</h1>
      <h4>Correct: <b>${correctAnswers}</b></h4>
      <h4>Inorrect: <b>${incorrectAnswers}</b></h4>
      <h4>Unanswered: <b>${unanswered}</b></h4>
    </div>
    <div class="float-right" id="stats-overall">
      <h1 class="display-4">Overall (${totalRounds})</h1>
      <h4>Correct: <b>${totalCorrectAnswers}</b></h4>
      <h4>Inorrect: <b>${totalIncorrectAnswers}</b></h4>
      <h4>Unanswered: <b>${totalUnanswered}</b></h4>
    </div>
    <div class="clearfix"></div>` )
    .hide()
    .fadeIn( 1000 );
  content.append(` 
    <div class="container" id="btn-container">
      <button type="button" class="btn btn-primary btn-lg" id="btn-restart">Play Again</button>
    </div> 
  `).hide().fadeIn( 2000 );
};

$( document ).on( 'click', '#btn-restart', () => {
  totalRounds++;
  content.empty();
  restartAnimate();
  generateCategoryHtml();
  setTimeout( () => {
    subtitle.fadeIn( 1000 )
    tab.show( )
  }, 2500 );
} );

$( document ).on( 'click', '#option-cog', function() {
  if ( gifOptionStatus ) {
    optionCog.toggleClass( 'fa-video fa-video-slash' )
    gifOptionStatus = false;
    gifOption = 1;
    console.log("gif option status " + gifOptionStatus)
  } else {
    optionCog.toggleClass( 'fa-video-slash fa-video' )
    gifOptionStatus = true;
    gifOption = 1000;
    console.log("gif option status " + gifOptionStatus)
  };
} );

appendModal = () => {
$( 'body' ).append(`
  <div class="modal fade" id="infoModal" tabindex="10" role="dialog" aria-labelledby="infoModal" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="indoModalTitle">About</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <p>This trivia game was created as a homework assignment for a Georgia Tech coding bootcamp in March 2019.</p>
        <p>This game was created using entirely Javascript and jQuery!</p>
        <p>Check out the <a href="https://github.com/EthanBonsignori/Trivia-Game" target="_blank">github repository</a> for this project.</p>
        <h6>-Ethan Bonsignori<span style="font-size: 0.1rem; float: right;">ps this game is known to get mad if you play too long</span></h6>
        </div>
      </div>
    </div>
  </div>`
  )
}

// Some fun animations
jumbotronAnimate = () => {
  divider.fadeIn( 2000 );
  jumbotron.animate( {
    height: '65vh'
  }, 2000, () => {
    subtitle.fadeIn( 1000 )
    tab.show()
  } ); 
}
 
titleAnimate = () => {
  title.fadeIn( 1000 );
  jumbotron.animate( {
    backgroundColor: "#e9ecef",
  }, 3000 ) 
  title.animate( {
    color: "#000"
  }, 3000, () => {
    startButton.fadeIn( 500 )
  } );
}

restartAnimate = () => {
  jumbotron.animate( { backgroundColor: jumboFadeColor }, 2000, () => 
    { jumbotron.animate( { backgroundColor: "#e9ecef" }, 2000 ) } 
  );
  title.animate( { color: titleFadeColor }, 2000, () => 
    { title.animate( { color: '#000' }, 2000 ) } 
  );
};

titleAnimate();