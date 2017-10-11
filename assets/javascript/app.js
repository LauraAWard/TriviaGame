$(window).on( "load", function() { //make sure window has finished loading


var game = {  //All game components are stored in an object


totalQuestions: 5,
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
endOfRndMessage: "",

question1: {

	question: "What was the original color of Oscar the Grouch?",
	answerChoices: ["Blue", "Green", "Orange", "Yellow"],
	answer: 2,
	imgSrc: "assets/images/Oscar.jpg",

	correctAns: function() {
		return this.answerChoices[this.answer];
	}

},

question2: {

	question: "What is the first name of Snuffleupagus?",
	answerChoices: ["Harry", "Aloysius", "Snuffy", "Ferdinand"],
	answer: 1,
	imgSrc: "assets/images/Snuffy.jpg",

	correctAns: function() {
		return this.answerChoices[this.answer];
	}

},

question3: {

	question: "Which of these ladies was Count von Count's girlfriend?",
	answerChoices: ["Countess Dahling von Dahling", "Lady Two", "Countess von Backwards", "All of the Above"],
	answer: 3,
	imgSrc: "assets/images/Count.jpg",

	correctAns: function() {
		return this.answerChoices[this.answer];
	}

},

question4: {

	question: "What is Elmo's favorite food?",
	answerChoices: ["Wasabi", "Baloney Sandwich", "Chocolate Milkshake", "Applesauce"],
	answer: 0,
	imgSrc: "assets/images/Elmo.jpg",

	correctAns: function() {
		return this.answerChoices[this.answer];
	}

},

question5: {

	question: "Who was the first celebrity to appear on Sesame Street?",
	answerChoices: ["Bill Cosby", "Robin Williams", "James Earl Jones", "Lena Horne"],
	answer: 2,
	imgSrc: "assets/images/JEJ.jpg",

	correctAns: function() {
		return this.answerChoices[this.answer];
	}

},

//function to start game
start: function() {

	game.createQuestionArray();
	game.displayQuestion();
},

//function to reset the timer before new question
resetTimer: function() {

	game.questionTimer = 30;
},

//function to clear content from screen before new content loads
resetDisplay: function() {

	$("#gameContainer").empty();
},

//function to reset game and play again
resetGame: function() {
	game.correctAnswers = 0;
	game.incorrectAnswers = 0;
	game.qInterval = 0;
	game.questionNbr = 0;
	game.endOfRndMessage = "";
	game.triviaObjectArray = [];
	game.resetDisplay();
	$("#gameContainer").append("<div id='startBtn' class='col-md-12'><button id='start' class='btn btn-success'>START</button></div>");
  	$("#start").on("click", game.start);


},

//function to feed question objects into array
createQuestionArray: function() {

	game.triviaObjectArray.push(game.question1, game.question2, game.question3, game.question4, game.question5);
},

//function to select next question, or end game if no more questions
nextQuestion: function() {
	game.resetMessage();

	if (game.questionNbr < (game.triviaObjectArray.length - 1)) {
		game.questionNbr++;
		game.displayQuestion();
	}
	else {
		game.displayScore();
	}
},

//function to display question and answer choices, and start question timer
displayQuestion: function() {

	game.resetDisplay();
	game.startQCountDown();

	var tempQObj = game.triviaObjectArray[game.questionNbr];
	$("#gameContainer").append("<div id='questionText' class='col-md-12'>" + tempQObj.question + "</div>");
	$("#gameContainer").append("<div id='answerChoices' class='col-md-8'></div>");

	var fcDiv = "<div class='form-check col-md-12'>";
	var fcLabel = "<label class='form-check-label'>";
	var fcInput = "<input class='form-check-input' type='radio' name='multiChoice' id='multiChoice-";
	var fcClose = "</span></label></div>";

	for (var i = 0, j = 1; i < tempQObj.answerChoices.length; i++, j++) {
		$("#gameContainer").append(fcDiv + fcLabel + fcInput + j + "' value='option" +
									 j + "'><span class='radioTxt'>" + tempQObj.answerChoices[i] + fcClose);
	}
	game.addRadioListener();
},

//function to listen for radio button input, and stop timer if so
addRadioListener: function() {
    	$('input[type=radio]').click(function(){
        game.checkAnswer(this);
        game.stopQCountDown();
	});

},

//function to decide if response is accurate and set message to display
checkAnswer: function(select) {

	var tempAnswer = select;
	var tempQObj = game.triviaObjectArray[game.questionNbr];

	if ($(tempAnswer).next().html() === tempQObj.correctAns()) {
		game.correctAnswers++;
		game.setMessage(game.msgCorrectResponse);
	}

	else if ($(tempAnswer).next().html() != tempQObj.correctAns()) {
		game.incorrectAnswers++;
		game.setMessage(game.msgIncorrectResponse);
	}

	else {game.setMessage(game.msgOutOfTime);
	}
	
},

//function to display correct answer, message and image, and kick off answer timer
displayAnswer: function() {
	
	var tempQObj = game.triviaObjectArray[game.questionNbr];
	var tempAnswer = tempQObj.correctAns();
	var tempImg = tempQObj.imgSrc;

	game.resetDisplay();
	$("#gameContainer").append("<div class='col-md-12' id='answerTxt'>" + game.endOfRndMessage + "</div>");
	$("#gameContainer").append("<div class='col-md-12' id='answerTxt'>The correct answer is: " + tempAnswer + "</div>");
	$("#gameContainer").append("<div class='col-md-12'><img src='" + tempImg + "' id='answerImg'></div>");

	game.startACountDown();
},

//function to display final score and button to play again
displayScore: function() {
	game.resetDisplay();
	var unanswered = (game.totalQuestions - game.correctAnswers - game.incorrectAnswers);
	$("#gameContainer").append("<div class='col-md-12' id='scoreTxt'>Correct Answers: " + game.correctAnswers + "</div>");
	$("#gameContainer").append("<div class='col-md-12' id='scoreTxt'>Incorrect Answers: " + game.incorrectAnswers + "</div>");
	$("#gameContainer").append("<div class='col-md-12' id='scoreTxt'>Unanswered Questions: " + unanswered + "</div>");
	$("#gameContainer").append("<div id='resetBtn' class='col-md-12'><button id='reset' class='btn btn-success'>START OVER</button></div>");
	$("#reset").on("click", game.resetGame);
},

//function to reset answer messages
resetMessage: function () {
	game.endOfRndMessage = "";

},

//function to display random answer messages
setMessage: function(msgArray) {
	var tempArray = msgArray;
	var tempIndex = (Math.floor(Math.random() * tempArray.length));
	game.endOfRndMessage = tempArray[tempIndex];
},

//function to time questions
questionCountDown: function() {

    if (game.questionTimer > 0) {
    game.questionTimer--;
	$("#countDown").html(game.questionTimer);
  }
  else {
  	game.stopQCountDown();

  }
},

//function to start and display timer on question
startQCountDown: function() {

	$("#gameContainer").append("<div class='col-md-12' id='timer'>Time Remaining: <span id='countDown'>" + 
								game.questionTimer + "</span> seconds</div>");

    qInterval = setInterval(game.questionCountDown, 1000);
  },

//function to stop question timer
 stopQCountDown: function() {

    clearInterval(qInterval);
   	game.resetTimer();
    game.displayAnswer();
  },

//function to time answer display
startACountDown: function() {
	setTimeout(game.nextQuestion, 1000 * game.answerTimer);

}

};


	$("#gameContainer").append("<div id='startBtn' class='col-md-12'><button id='start' class='btn btn-success'>START</button></div>");
	
  	$("#start").on("click", game.start);

});