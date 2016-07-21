console.log("pearson goes vegas");

$(document).ready(function() {

/////////// Hamburger Menu for Tablets and IPhones ////////////

$( ".cross" ).hide();
$( ".menu" ).hide();
$( ".hamburger" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".hamburger" ).hide();
$( ".cross" ).show();
});
});

$( ".cross" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".cross" ).hide();
$( ".hamburger" ).show();
});
});

////////////// Countdown Timer ///////////////

/* jQuery grabber variables */
var $days = $('#days');
var $hours = $('#hours');
var $minutes = $('#minutes');
var $seconds = $('#seconds');

/* Variables */
var deadline = 'October 7 2016 23:59:59 GMT+0200';

function getTimeRemaining(endtime){
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(){
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(deadline);
    $days.text(t.days);
    $hours.text(t.hours);
   	$minutes.text(t.minutes);
   	$seconds.text(t.seconds)
  },1000);
}

initializeClock(deadline);

//////////////// Trivia Quiz /////////////////

(function() {
  var questions = [{
    question: "What were the names of the two cats who lived at 290 Pearson Street?",
    choices: ["Maru and Grumpy Cat", "Baby Joey and Zoe", "Milo and Otis", "Cole and Marmalade"],
    correctAnswer: 1
  }, {
    question: "Who was the only rent-paying, female resident?",
    choices: ["Holly Golightly", "Holly Madison", "Holly Avurnin", "Holly Wood"],
    correctAnswer: 2
  }, {
    question: "Which resident relieved himself on the entertainment center?",
    choices: ["Marc Vanderkeere", "Brad Pitser", "Alex Hawkins","Joe Hessling"],
    correctAnswer: 2
  }, {
    question: "Whose girlfriend exclaimed, <q>Oh! I get it! You make words!</q> while observing a game of Scrabble?",
    choices: ["Joe Kelleher", "Dave Posch","Kegger", "Mike Vanderkeere"],
    correctAnswer: 1
  }, {
    question: "Bonus question - What was her occupation?",
    choices: ["Etymologist", "Waitress", "Lawyer", "Stripper"],
    correctAnswer: 3
  }, {
    question: "Who was the winner of the April Stools contest?",
    choices: ["Brad Pitser", "Jason Pitser", "Brad Hilborn", "Alex Hawkins"],
    correctAnswer: 0
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li class="answers">');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] == questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right.');
    return score;
  }
})();

}); //<--closes out the document ready jQuery

////////////Map and Map Markers///////////////

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 36.1212, lng: -115.1697}
  });
  setMarkers(map);
}

// Data for the markers consisting of a name, a LatLng and a zIndex for the
// order in which these markers should display on top of each other.
var locations = [
  ['Bellagio', 36.114, -115.172751, 4],
  ['e by Jose Andreas', 36.1097544, -115.17387259999998, 3],
  ['XS', 36.1265953, -115.1653652, 2],
  ['Venetian Sports Book', 36.124302, -115.168613, 1],
];

function setMarkers(map) {
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  for (var i = 0; i < locations.length; i++) {
    var location = locations[i];
    var marker = new google.maps.Marker({
      position: {lat: location[1], lng: location[2]},
      map: map,
      shape: shape,
      icon: '/img/hopmarker.png',
      title: location[0],
      zIndex: location[3],
    });
  }
}



