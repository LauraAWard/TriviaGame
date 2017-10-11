$(window).on( "load", function() { //make sure window has finished loading


var game = {

// var totalQuestions = 10;
// var correctAnswers = 0;
// var incorrectAnswers = 0;
// var msgOutOfTime = ["You've run out of time!", "Time's Up!", "Did you fall asleep?"];
// var msgIncorrectResponse = ["Incorrect!", "Wrong answer!", "Not even close!"];
// var msgCorrectResponse = ["Congratulations!", "You got it!", "What a master!"];
// var triviaObjectArray = [];
// var questionTimer = 30;
// var answerTimer = 5;

totalQuestions: 10,
correctAnswers: 0,
incorrectAnswers: 0,
msgOutOfTime: ["You've run out of time!", "Time's Up!", "Did you fall asleep?"],
msgIncorrectResponse: ["Incorrect!", "Wrong answer!", "Not even close!"],
msgCorrectResponse: ["Congratulations!", "You got it!", "What a master!"],
triviaObjectArray: [],
questionTimer: 30,
answerTimer: 5,
qInterval: 0,
questionNbr: 0,

question1: {

	question: "What was the original color of Oscar the Grouch?",
	answerChoices: ["Blue", "Green", "Orange", "Yellow"],
	answer: 2,
	imgSrc: "assets/images/Oscar.jpg",

	correctAns: function() {
		return this.answerChoices[answer];
	}

},


//function to start game

start: function() {

	console.log("Game Started");
	game.createQuestionArray();
	game.nextQuestion();
},

resetTimer: function() {

	game.questionTimer = 30;
},

resetDisplay: function() {

	$("#gameContainer").empty();
},
//function to reset game

//constructor to create question objects

// triviaObject: function(q, ) {


// },

//function to create question objects and feed into array
createQuestionArray: function() {

	game.triviaObjectArray.push(game.question1);
},


//function to display question and possible answers
nextQuestion: function() {

	console.log("Next Question");
	game.resetDisplay();
	game.startQCountDown();

	var tempQObj = game.triviaObjectArray[game.questionNbr];
	$("#gameContainer").append("<div id='questionText'>" + tempQObj.question + "</div>");
	$("#gameContainer").append("<div id='answerChoices'></div>");

	var fcDiv = "<div class='form-check'>";
	var fcLabel = "<label class='form-check-label'>";
	var fcInput = "<input class='form-check-input' type='radio' name='multiChoice' onclick='checkAnswer();' id='multiChoice-";
	var fcClose = "</span></label></div>";

	for (var i = 0, j = 1; i < tempQObj.answerChoices.length; i++, j++) {
		$("#gameContainer").append(fcDiv + fcLabel + fcInput + j + "' value='option" +
									 j + "'><span>" + tempQObj.answerChoices[i] + fcClose);
		// console.log(fcDiv + fcLabel + fcInput + j + "' value='option" + j + "'>" + tempQObj.answerChoices[i] + fcClose);
		// $("#multiChoice-" + j).html(tempQObj.answerChoices[i]);
		console.log(tempQObj.answerChoices[i]);
		// $(".form-check-input").attr("id", "multiChoice-" + j);
		// $(".form-check-input").attr("value", "option" + j);
		var what = $("#multiChoice-" + j).next().html();
		// console.log($("#multiChoice-" + j));
		console.log(what);
	}
},

//function to decide if response is accurate

checkAnswer: function() {

	// var tempQObj = game.triviaObjectArray[game.questionNbr];
	if ($('input[name=multiChoice]:checked').length > 0) {
		console.log("something was checked");
	}
	else {console.log("nothing was checked");
	}
	
	// if

},

//function to display correct answer and image

displayAnswer: function() {
	console.log("Display Answer");
	$("#gameContainer").empty();
	game.startACountDown();
},

//function to display messages

//function to time questions

questionCountDown: function() {

    if (game.questionTimer > 0) {
    game.questionTimer--;
	$("#countDown").html(game.questionTimer);
  	console.log("Tick Tock");
  }
  else {
  	game.stopQCountDown();
  	game.checkAnswer();
  }
},

startQCountDown: function() {

	$("#gameContainer").append("<div>Time Remaining: <span id='countDown'>" + 
								game.questionTimer + "</span> seconds</div>");

    qInterval = setInterval(game.questionCountDown, 1000);
        // clockRunning = true;
    console.log("Timer Started");
  },

 stopQCountDown: function() {

    clearInterval(qInterval);
   	game.resetTimer();
    // clockRunning = false;
    console.log("Time's Up");
    game.displayAnswer();
  },



//function to time answers

startACountDown: function() {
	setTimeout(game.nextQuestion, 1000 * game.answerTimer);

}

};

	$("#gameContainer").append("<div id='startBtn'><button id='start'>Start</button></div>");
	
  	$("#start").on("click", game.start);
  	$(".form-check-input").on("click", game.checkAnswer);

});