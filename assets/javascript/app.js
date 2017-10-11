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
// var qInterval = 0;
// var questionNbr = 0;


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


// var question1 = {

// 	question = "What was the original color of Oscar the Grouch?";
// 	answerChoices = ["Blue", "Green", "Orange", "Yellow"];
// 	answer = 2;
// 	imgSrc = "assets/images/Oscar.jpg";

// 	correctAns: function() {
// 		return this.answerChoices[answer];
// 	};

// };


//function to start game

start: function() {

	console.log("Game Started");
	game.createQuestionArray();
	game.displayQuestion();
},

resetTimer: function() {

	game.questionTimer = 30;
},

resetDisplay: function() {

	$("#gameContainer").empty();
},
//function to reset game

resetGame: function() {
	game.correctAnswers = 0;
	game.incorrectAnswers = 0;
	game.qInterval = 0;
	game.questionNbr = 0;
	game.endOfRndMessage = "";
	game.triviaObjectArray = [];
	game.resetDisplay();
	$("#gameContainer").append("<div id='startBtn'><button id='start'>Start</button></div>");
  	$("#start").on("click", game.start);


},
//constructor to create question objects

// triviaObject: function(q, ) {


// },

//function to create question objects and feed into array
createQuestionArray: function() {

	game.triviaObjectArray.push(game.question1, game.question2, game.question3, game.question4, game.question5);
},
//function to select next question

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

//function to display question and answer choices
displayQuestion: function() {

	console.log("Next Question");
	game.resetDisplay();
	game.startQCountDown();

	var tempQObj = game.triviaObjectArray[game.questionNbr];
	$("#gameContainer").append("<div id='questionText'>" + tempQObj.question + "</div>");
	$("#gameContainer").append("<div id='answerChoices'></div>");

	var fcDiv = "<div class='form-check'>";
	var fcLabel = "<label class='form-check-label'>";
	var fcInput = "<input class='form-check-input' type='radio' name='multiChoice' id='multiChoice-";
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
		// $("#multiChoice-" + j).attr("onclick","chkAnswer()");
	}
	game.addRadioListener();
},

addRadioListener: function() {
	// $(document).ready(function(){
    	$('input[type=radio]').click(function(){
        console.log($(this).next().html());
        	// alert(this.value);
        game.checkAnswer(this);
        game.stopQCountDown();
    // });
});


},

//function to decide if response is accurate

checkAnswer: function(select) {

	var tempAnswer = select;
	var tempQObj = game.triviaObjectArray[game.questionNbr];

	if ($(tempAnswer).next().html() === tempQObj.correctAns()) {
		console.log("it matches!");
		game.correctAnswers++;
		game.setMessage(game.msgCorrectResponse);
	}

	else if ($(tempAnswer).next().html() != tempQObj.correctAns()) {
		game.incorrectAnswers++;
		game.setMessage(game.msgIncorrectResponse);
	}

	else {game.setMessage(game.msgOutOfTime);
	}
	// var tempQObj = game.triviaObjectArray[game.questionNbr];
	if ($('input[type=radio]:checked').length > 0) {
		console.log("something was checked");
	}
	else {console.log("nothing was checked");
	}
	
	// if

},

//function to display correct answer and image

displayAnswer: function() {
	console.log("Display Answer");
	
	var tempQObj = game.triviaObjectArray[game.questionNbr];
	var tempAnswer = tempQObj.correctAns();
	var tempImg = tempQObj.imgSrc;

	$("#gameContainer").empty();
	$("#gameContainer").append("<div>" + game.endOfRndMessage + "</div>");
	$("#gameContainer").append("<div>The correct answer is: " + tempAnswer + "</div>");
	$("#gameContainer").append("<div><img src='" + tempImg + "'></div>");

	game.startACountDown();
},

//function to display final score

displayScore: function() {
	game.resetDisplay();
	var unanswered = (game.totalQuestions - game.correctAnswers - game.incorrectAnswers);
	$("#gameContainer").append("<div>Correct Answers: " + game.correctAnswers + "</div>");
	$("#gameContainer").append("<div>Incorrect Answers: " + game.incorrectAnswers + "</div>");
	$("#gameContainer").append("<div>Unanswered Questions: " + unanswered + "</div>");
	$("#gameContainer").append("<div id='resetBtn'><button id='reset'>Start Over</button></div>");
	$("#reset").on("click", game.resetGame);
},

//function to reset messages
resetMessage: function () {
	game.endOfRndMessage = "";

},

//function to display messages
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
  	console.log("Tick Tock");
  }
  else {
  	// game.checkAnswer();
  	game.stopQCountDown();

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

// var chkAnswer = function() {

// 	game.checkAnswer();

// };

	$("#gameContainer").append("<div id='startBtn'><button id='start'>Start</button></div>");
	
  	$("#start").on("click", game.start);
  	// $(".form-check-input").on("click", chkAnswer);

});