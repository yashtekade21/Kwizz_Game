const questions = [
    ["The International Literacy Day is observed on ",
        "Sep 8", "Nov 28", "May 2", "Sep 22", 1],

    ["The language of Lakshadweep, a Union Territory of India, is ",
        "Hindi", "Marathi", "Malayalam", "Telugu", 3],

    ["Which day is observed as the World Standards Day? ",
        "Jun 8", "Aug 2", "Oct 14", "Nov 15", 3],

    ["Bahubali festival is related to ", "Hinduism",
        "Islam", "Buddhism", "Jainism", 4],

    ["Who is the author of the epic 'Meghdoot'? ",
        "Vishakadatta", "Valmiki", "Banabhatta", "Kalidas", 4],

    ["Van Mahotsav was started by ", "Maharshi Karve",
        "Bal Gangadhar Tilak", "K.M. Munshi", "Sanjay Gandhi", 3],

    ["The Krithi system was perfected and Carnatic music was given by ",
        "Arunagirinathan", "Purandaradasa", "Shyama Shastri", "Swati Tirunal", 4],

    ["Writers Building is the headquarters of ", "The Times of India Group",
        "All India Writers Association", "West Bengal Government", "Press Trust of India", 4],

    ["The Konark Temple is dedicated to ",
        "Vishnu", "Shiva", "Krishna", "Sun-God", 4],

    ["The 227-year-old 'Nawab Saheb Ki Haveli' is located at ",
        "Hyderabad", "Jaipur", "New Delhi", "Agra", 2],

    ["Which of the following Academy is responsible for fostering the development of dance, drama, and music in India? ",
        "Lalit Kala Academy", "Sahitya Academy", "National School of Drama", "Sangeet Academy", 4],

    ["In which of the following countries has India not organised 'India Festival'? ",
        "Russia", "Japan", "France", "West Germany", 4],

    ["The Indian National Calendar is based on ",
        "Christian era", "Saka era", "Vikram era", "Hiji era", 2],

    ["The abbreviation 'fob' stands for ", "Free on Board",
        "Free of Bargain", "Fellow of Britain", "None of these", 1],

    ["Which party was founded by Sampat Pal Devi to stop violence against women in Bundelkhand?",
        " Laxmibai Sena", "Gulabi Gang", "Nari Mukti Vahini", "Mahila Morcha", 2],

    ["Which British Army unit was given the motto 'Primus in Indis' because it was the first to serve in India? ",
        "41st (Welsh) Regiment of Foot", "1st Coldstream Guards", "5th Light Infantry", "39th Regiment of Foot", 4],
];

const prizeMoney = [1000, 2000, 3000, 5000, 10000, 20000, 40000, 80000,
    160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000];

let currentQuestionIndex = 0;
let totalPrizeWon = 0;
let lifelinesUsed = { fiftyFifty: false, flipQuestion: false, askAudience: false, twoAttempts: false };
let attemptCount = 1;
let attemptedQuestions = new Set();
let prizeIndex = 0;


function loadQuestion(index) {
    if (attemptedQuestions.size === questions.length) {
        document.getElementById('result').innerText = "Congratulations! You've completed the quiz and won ₹" + totalPrizeWon;
        return;
    }

    while (attemptedQuestions.has(index)) {
        index++;
        if (index >= questions.length) {
            index = 0;
        }
    }

    document.getElementById('questionNumber').innerText = `Question ${prizeIndex + 1} for ₹${prizeMoney[prizeIndex]}`; // Use prizeIndex for money
    document.getElementById('questionText').innerText = questions[index][0];
    document.getElementById('option1Text').innerText = questions[index][1];
    document.getElementById('option2Text').innerText = questions[index][2];
    document.getElementById('option3Text').innerText = questions[index][3];
    document.getElementById('option4Text').innerText = questions[index][4];

    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.checked = false;
        radio.disabled = false;
    });

    document.getElementById('result').innerText = "";
}



function getSelectedOption() {
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    return selectedRadio ? parseInt(selectedRadio.value) : null;
}

function checkAnswer() {
    const selectedOption = getSelectedOption();
    if (selectedOption === null) {
        alert("Please select an answer!");
        return;
    }

    const correctOption = questions[currentQuestionIndex][5];
    if (selectedOption === correctOption) {
        document.getElementById('result').innerText = "Correct Answer!";
        totalPrizeWon = prizeMoney[prizeIndex];
        attemptedQuestions.add(currentQuestionIndex);
        attemptCount = 1;

        if (prizeIndex < questions.length - 1) {
            prizeIndex++;
        }


        if (prizeIndex === questions.length - 1) {
            window.location.href = `win.html?amount=${totalPrizeWon}`;
            return;
        }

        currentQuestionIndex++;
        setTimeout(() => loadQuestion(currentQuestionIndex), 1000);
    } else {
        attemptCount--;
        if (attemptCount > 0) {
            alert(`Wrong answer. You have ${attemptCount} attempt(s) left.`);
            setTimeout(() => loadQuestion(currentQuestionIndex), 1000);
        } else {
            document.getElementById('result').innerText = `Wrong Answer. Game Over! You won ₹${totalPrizeWon}.`;
            window.location.href = `win.html?amount=${totalPrizeWon}`;
        }
    }
}
document.getElementById('submitAnswer').addEventListener('click', checkAnswer);

document.getElementById('fiftyFifty').addEventListener('click', () => {
    if (lifelinesUsed.fiftyFifty) return;
    lifelinesUsed.fiftyFifty = true;
    markLifelineUsed('fiftyFifty');

    const correctOption = questions[currentQuestionIndex][5];
    const optionsToHide = [1, 2, 3, 4].filter(opt => opt !== correctOption).sort(() => 0.5 - Math.random()).slice(0, 2);

    optionsToHide.forEach(option => {
        document.getElementById('option' + option).disabled = true;
        document.getElementById('option' + option + 'Text').classList.add('hidden');
    });
});

document.getElementById('flipQuestion').addEventListener('click', () => {
    if (lifelinesUsed.flipQuestion) return;
    lifelinesUsed.flipQuestion = true;
    markLifelineUsed('flipQuestion');

    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
});

document.getElementById('askAudience').addEventListener('click', () => {
    if (lifelinesUsed.askAudience) return;
    lifelinesUsed.askAudience = true;
    markLifelineUsed('askAudience');

    const correctOption = questions[currentQuestionIndex][5];
    alert(`Audience suggests the correct option is: ${correctOption}`);
});

document.getElementById('twoAttempts').addEventListener('click', () => {
    if (lifelinesUsed.twoAttempts) return;
    lifelinesUsed.twoAttempts = true;
    markLifelineUsed('twoAttempts');
    attemptCount = 2;
    alert("You now have 2 attempts for this question!");
});

function markLifelineUsed(lifeline) {
    const button = document.getElementById(lifeline);
    button.classList.add('used');
    button.disabled = true;
}


loadQuestion(currentQuestionIndex);
