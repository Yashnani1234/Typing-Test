let timerEl = document.getElementById("timer");
let quoteDisplayEl = document.getElementById("quoteDisplay");

let resultEl = document.getElementById("result");
resultEl.style.textAlign = "center";

let spanEl = document.getElementById("span");
let textareaEl = document.getElementById("quoteInput");
let submitBtnEl = document.getElementById("submitBtn");
let resetBtnEl = document.getElementById("resetBtn");
let startBtnEl = document.getElementById("startBtn");
let spinEl = document.getElementById("loading");
let successEl = document.getElementById("great");
let intervalId;
let count = 0;

function displayTimerFunction() {
    function counterTimer() {
        count = count + 1;
        timerEl.textContent = count;
    }

    intervalId = setInterval(counterTimer, 1000);
}

function clearTime() {
    clearInterval(intervalId);
    count = 0;
    timerEl.textContent = count;
}

function fetchQuoteStatement() {
    clearTime();
    textareaEl.value = "";
    resultEl.textContent = "";
    successEl.textContent = "";
    spanEl.textContent = "seconds";
    let url = "https://apis.ccbp.in/random-quote";
    quoteDisplayEl.textContent = "";
    spinEl.classList.remove("d-none");
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            spinEl.classList.add("d-none");
            quoteDisplayEl.textContent = jsonData.content;
        });
    displayTimerFunction();
}

startBtnEl.addEventListener("click", fetchQuoteStatement)
resetBtnEl.addEventListener("click", fetchQuoteStatement);


function checkStatement() {
    let quote = quoteDisplayEl.textContent;
    let text = textareaEl.value;
    if (quote === text) {
        clearInterval(intervalId);

        resultEl.textContent = "You typed in " + count + " seconds";
        successEl.textContent = "GREAT";
        timerEl.textContent = "";
        spanEl.textContent = "";

    } else {
        clearInterval(intervalId);
        resultEl.textContent = "You typed incorrect sentence";
    }

}

submitBtnEl.addEventListener("click", checkStatement);
