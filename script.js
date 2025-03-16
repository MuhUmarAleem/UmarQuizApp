const questions = [
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Hemingway", "Tolstoy", "Austen"], answer: "Shakespeare" },
    { question: "What is the capital of France?", options: ["Rome", "Berlin", "Paris", "Madrid"], answer: "Paris" },
    { question: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], answer: "8" },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "Who discovered gravity?", options: ["Einstein", "Newton", "Galileo", "Curie"], answer: "Newton" },
    { question: "Which animal is known as the King of the Jungle?", options: ["Elephant", "Tiger", "Lion", "Cheetah"], answer: "Lion" },
    { question: "Which continent is the largest?", options: ["Africa", "Asia", "Europe", "Antarctica"], answer: "Asia" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;
let leaderboard = [
    { name: "Alice", score: 10 },
    { name: "Bob", score: 7 },
    { name: "Charlie", score: 5 }
];
let userName = "";

function startQuiz() {
    userName = document.getElementById("username").value;
    if (!userName) {
        alert("Please enter your name to start the quiz.");
        return;
    }
    document.getElementById("start-container").classList.add("d-none");
    document.getElementById("quiz-container").classList.remove("d-none");
    score = 0;
    currentQuestionIndex = 0;
    loadQuestion();
}

function loadQuestion() {
    clearTimeout(timer);
    timeLeft = 20;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);

    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").innerText = questionData.question;
    document.getElementById("options").innerHTML = "";
    questionData.options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.classList.add("btn", "btn-outline-primary", "mt-2");
        btn.onclick = () => {
            checkAnswer(option, questionData.answer);
            document.getElementById("next-btn").disabled = false;
        };
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    clearInterval(timer);
    document.getElementById("feedback").innerText = selected === correct ? "Correct!" : "Wrong!";
    if (selected === correct) score++;
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        document.getElementById("feedback").innerText = "";
        document.getElementById("next-btn").disabled = true;
        loadQuestion();
    } else {
        endQuiz();
    }
});

function endQuiz() {
    document.getElementById("quiz-container").classList.add("d-none");
    document.getElementById("result-container").classList.remove("d-none");
    document.getElementById("score").innerText = score;
    leaderboard.push({ name: userName, score });
    leaderboard.sort((a, b) => b.score - a.score);
    document.getElementById("leaderboard").innerHTML = leaderboard.map(entry => `<li class='list-group-item'>${entry.name}: ${entry.score} points</li>`).join('');
}

function restartQuiz() {
    document.getElementById("result-container").classList.add("d-none");
    document.getElementById("start-container").classList.remove("d-none");
}