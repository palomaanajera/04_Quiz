var theQuestions = document.getElementById("quiz-questions");
var timer = document.getElementById("timer");
var btnStart = document.getElementById("btn-start");
var timecounter = document.getElementById("timecounter");
var titleitem = document.getElementById("title-item");
var nextQuestions 
var questionanswers = document.getElementById("question-answers");
var myScore = document.getElementById("score");
var btnScore = document.getElementById("btnScore");
var currentindex = 0;
var score = 0;
var count = 75;
var alert =document.getElementById("alert");
var info = document.getElementById("info");
var title = document.getElementById("title");
var allDone = document.getElementById("all-done");
var final = document.getElementById("final");
var allScores = [];
var savedScores = JSON.parse(localStorage.getItem("userData"));
var questions = [
    {
        title: "Commonly used data type Do Not include:____",
        choices: ["1. strings","2. booleance","3. alerts", "4. numbers"],
        answer : "3. alerts"    
    },
    {
        title: "The condition in an if/else statement is enclosed within:____",
        choices: ["1. quotes","2. Curly brackets","3. parentheses", "4. square brackets"],
        answer : "3. parentheses"    
    },
    {
        title: "Arrays in JavaScript can be used to store:___",
        choices: ["1. numbers and strings","2. others Arrays","3. booleances", "4. all of the above"],
        answer : "4. all of the above"    
    },
    {
        title: "String values must be enclosed within ___ when being assigned to variables ",
        choices: ["1. commas","2. curly brackets","3. quotes","4. parentheses"],
        answer : "3. quotes"    
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:___",
        choices: ["1. JavaScript","2. terminal/bash","3. alerts", "4. console.log"],
        answer : "4. console.log"    
    },
]
btnStart.addEventListener("click", starQuiz);
function starQuiz(){
    if(savedScores !==null) {
        allScores = savedScores;
    }
    
    title.classList.add("d-none");
    info.classList.add("d-none")
    btnStart.classList.add("d-none")
    timecounter.classList.remove("d-none")
    theQuestions.classList.remove("d-none")
    nextQuestions= questions[currentindex]
    console.log(nextQuestions.title)
    
        displayQuestion(nextQuestions)

    gametime()
}
btnScore.addEventListener("click" , function(){
    let name = document.getElementById("inputScore").value
    scorePage(name, count)
});


function gametime(){

    var timeinterval = setInterval(function(){
        timer.innerText = count
         count--;
        }, 1000);

}

function scorePage(a, b) {

    var userData = {
        inits: a,
        userScore: b
    };
    allScores.push(userData);

    localStorage.setItem("userData", JSON.stringify(allScores));
    location.href = "score.html";
}

function displayQuestion(question){
    titleitem.innerText=question.title
    question.choices.forEach(element => {
     var button =document.createElement("button")
    button.className="d-block p-2 btn-secondary btn-block text-left"
    button.innerText=element
    questionanswers.appendChild(button)
    button.addEventListener("click", displaynextQuestion)
    });
}


function displaynextQuestion(e){
    currentindex++
    if(currentindex < questions.length){
        correction(e.target.innerText == nextQuestions.answer)
        questionanswers.innerHTML=""
        if(currentindex < questions.length){    
            nextQuestions= questions[currentindex]
            displayQuestion(nextQuestions)  
        }else {
            currentindex = 0
            displayQuestion(nextQuestions)  
        }

    }else{
        console.log("endgame")
        endgame()
        

    }
    
     
}
function correction(response){
    
    if(response){
        alert.innerText= "Good"
        console.log("Good")
    }else {
        alert.innerText="Wrong"
        count = count -15
        timer.innerHTML = count
        console.log("Wrong")

    }
    setTimeout(function(){
        alert.innerText=""
    
        }, 1000);

}
 function endgame (){  
    final.innerText = "Your final score is: "+count
    allDone.classList.remove("d-none");
    addscore.classList.remove("d-none")
    timecounter.classList.add("d-none")
    theQuestions.classList.add("d-none")
    addscore.classList.remove("d-none")


 }
