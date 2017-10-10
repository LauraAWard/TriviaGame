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


//function to start game

start: function() {

console.log("Game Started");
game.questionCountDown();
},

//function to reset game

//constructor to create question objects

//function to create question objects and feed into array

//function to display question and possible answers

//function to decide if response is accurate

//function to display correct answer and image

//function to display messages

//function to time questions

questionCountDown: function() {

	$("#gameContainer").append("<div>Time Remaining: <span id='countDown'></span> seconds</div>");
  	console.log("Timer Started");
}


//function to time answers

};

	$("#gameContainer").append("<div id='startBtn'><button id='start'>Start</button></div>");
	
  	$("#start").on("click", game.start);

});