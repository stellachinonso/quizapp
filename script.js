const questions = [
    {
    question: " HTML stand for?",
    answers: [
        {text: "Hypermark Language", correct: false},
        {text: "Hypertext Markup Language", correct: true},
        {text: "Hypermix Language", correct: false},
        {text: "Hypertension Language", correct: false},
    ]
},
{
    question: " Which attribute specifies a unique alphanumeric identifier to be associated with an element?",
    answers: [
        {text: "id", correct: true},
        {text: "class", correct: false},
        {text: "article", correct: false},
        {text: "identifier", correct: false},
    ]   
},
{
    question: "Which tag is used for bold, apart from b?",
    answers: [
        {text: "body", correct: false},
        {text: "bold", correct: false},
        {text: "bb", correct: false},
        {text: "strong", correct: true},
    ]   
},
{
    question: "From which tag descriptive list starts ??",
    answers: [
        {text: "LL", correct: false},
        {text: "DL", correct: true},
        {text: "LDL", correct: false},
        {text: "DD", correct: false},
    ]   
},
{
    question: "Select the attribute of form tag?",
    answers: [
        {text: "Action", correct: true},
        {text: "Meth", correct: false},
        {text: "Forming", correct: false},
        {text: "None", correct: false},
    ]   
},
{
    question: "datetime attribute is not related with?",
    answers: [
        {text: "del", correct: false},
        {text: "time", correct: false},
        {text: "ins", correct: false},
        {text: "form", correct: true},
    ]   
},
{
    question: "Which of the tag is used to creates a bullet list?",
    answers: [
        {text: "ul", correct: true},
        {text: "ol", correct: false},
        {text: "dl", correct: false},
        {text: "td", correct: false},
    ]   
},
{
    question: "Which HTML tag produces the biggest heading?",
    answers: [
        {text: "h2", correct: false},
        {text: "h6", correct: false},
        {text: "h1", correct: true},
        {text: "h8", correct: false},
    ]   
},
{
    question: "Which parameter is used for size attribute?",
    answers: [
        {text: "Pixels", correct: true},
        {text: "inch", correct: false},
        {text: "Milimeter", correct: false},
        {text: "cm", correct: false},
    ]   
},
{
    question: "Which type of language is HTML?",
    answers: [
        {text: "Scripting Language", correct: false},
        {text: "Markup Language", correct: true},
        {text: "Programming Language", correct: false},
        {text: "Network Language", correct: false},
    ]   
}
];


//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let questionNo;
let timeOut;

function startTime(){
    let timeValue =  timeDuration;
    let updateTime = ()=>{
        const minutes = Math.floor(timeValue / 60);
        const seconds = timeValue % 60;
        timeCount.innerHTML = `${minutes}:${seconds}`;
        console.log(timeCount);
        if(timeValue === 0){
            alert("Time up!")
            showScore();
        } else if (questionNo > 10){
            showScore();
        }else{
            timeValue--;
           timeOut = setTimeout(updateTime, 1000);
        }
        //timeOut = setTimeout(updateTime, 1000); // set the timeout before calling updateTime
    } 
    updateTime();

}

// if startQuiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    startTime(); //start timer
     //startQuiz();
    
}

const timeDuration = 600
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    clearTimeout(timeOut);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
    
}

function showQuestion(){
    
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    clearTimeout(timeOut);
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    if (score < questions.length){
    nextButton.innerHTML = "Try Again";
}else{
    nextButton.innerHTML = "Well done"
}
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        startTime();
    }
});


startQuiz();
